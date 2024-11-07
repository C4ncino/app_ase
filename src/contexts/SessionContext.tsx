import { router } from "expo-router";
import sha256 from "crypto-js/sha256";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAPI from "@/hooks/useAPI";
import { useBleContext } from "@/hooks/useBLEContext";
import { useModelsContext } from "@/hooks/useModelsContext";
import { useNetworkContext } from "@/hooks/useNetworkContext";

export const SessionContext = React.createContext<SessionContextModel>({
  wordsCount: 0,
  updateWordsCount: () => new Promise((resolve) => resolve()),
  login: () => new Promise((resolve) => resolve(false)),
  signUp: () => new Promise((resolve) => resolve(false)),
  logout: () => {},
  refresh: () => new Promise((resolve) => resolve()),
  hash: () => "",
});

type Props = {
  children: React.ReactNode;
};

const SessionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<Token>();
  const [wordsCount, setWordCount] = useState(0);
  const { get, post } = useAPI();

  const { forget } = useBleContext();
  const { isConnected, lookForConnection } = useNetworkContext();
  const { setLargeModel, saveModel, addSmallModel, largeModel, smallModels } =
    useModelsContext();

  useEffect(() => {
    if (!isConnected || !user || !token) return;

    lookForConnection();

    const fetchModels = async () => {
      const date = new Date();
      const dateStr = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} 00:00:00`;

      const response = await post(
        "models/check_version/" + user?.id,
        JSON.stringify({
          date: largeModel ? largeModel.last_update : dateStr,
          small: smallModels ? smallModels : {},
        }),
        token
      );

      if (!response) return;
      if (response.large_updated && response.small_updated) return;

      if (!response.large_updated) {
        const filePath = await saveModel(
          response.latest_model.model,
          "generalModel/"
        );

        setLargeModel({
          model_path: filePath,
          last_update: response.latest_model.last_update,
        });
      }

      if (!response.small_updated) {
        for (const model of response.small_models) {
          const filePath = await saveModel(model.model, `${model.class_key}/`);
          addSmallModel(
            {
              meaning: model.word,
              model_path: filePath,
            },
            model.class_key
          );
        }
      }
    };

    fetchModels();
  }, [isConnected, user, token, smallModels, largeModel]);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        await logout();
        return;
      }

      const response = await get("users/me", token ? token : "");

      if (!response) await logout();

      await setSessionData(response.user, token);

      await refresh(token);
    };

    if (!isConnected) return;
    getToken();
  }, [isConnected]);

  const convertDateString = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(" ");

    const [day, month, year] = datePart.split("-");

    const formattedDateString = `${year}-${month}-${day}T${timePart}`;

    return new Date(formattedDateString);
  };

  const setSessionData = async (user: UserResponse, token: Token) => {
    setUser({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      bday: new Date(user.bday),
      creationDate: convertDateString(user.creationDate),
    });

    setToken(token);

    await AsyncStorage.setItem("token", token);

    await updateWordsCount();
  };

  const updateWordsCount = async () => {
    try {
      const res = await get("words/how-many/" + user?.id, token);
      if (!res) throw new Error();
      await AsyncStorage.setItem("wordsCount", res.count.toString());
      setWordCount(res.count);
    } catch {
      const count = await AsyncStorage.getItem("wordsCount");
      setWordCount(count ? parseInt(count) : 0);
    }
  };

  const hash = (password: string) => {
    return sha256(password).toString();
  };

  const login = async (data: LoginInfo) => {
    const response = await post("users/login", JSON.stringify(data));

    if (response) {
      await setSessionData(response.user, response.token);
      return true;
    }
    return false;
  };

  const signUp = async (data: SignupInfo) => {
    const response = await post("users/sign-up", JSON.stringify(data));

    if (response) {
      await setSessionData(response.user, response.token);
      return true;
    }

    return false;
  };

  const logout = async () => {
    setUser(undefined);

    setToken(undefined);

    await AsyncStorage.removeItem("token");

    forget();

    router.replace("/login");
  };

  const refresh = async (inToken?: Token) => {
    if (!inToken) inToken = token;

    const response = await get("users/refresh", inToken);

    if (!response) {
      await logout();
      return;
    }

    setToken(response.token);

    await AsyncStorage.setItem("token", response.token);
  };

  const sessionContext: SessionContextModel = {
    wordsCount,
    updateWordsCount,
    user,
    token,
    login,
    signUp,
    logout,
    refresh,
    hash,
  };

  return (
    <SessionContext.Provider value={sessionContext}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
