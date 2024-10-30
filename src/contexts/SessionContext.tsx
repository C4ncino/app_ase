import { router } from "expo-router";
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
  const { isConnected } = useNetworkContext();
  const { setLargeModel, saveModel, addSmallModel, largeModel, smallModels } =
    useModelsContext();

  useEffect(() => {
    if (!isConnected || !user || !token) return;

    const fetchModels = async () => {
      if (!largeModel) return;

      const response = await post(
        "models/check-version/" + user?.id,
        JSON.stringify({
          date: largeModel?.last_update,
        }),
        token
      );

      if (response && !response.updated) {
        console.log("new large model");

        const modelPath = await saveModel(
          response.model.model,
          "generalModel/"
        );

        setLargeModel({
          model_path: modelPath,
          last_update: response.model.last_update,
        });
      }

      const modelsCount = Object.keys(smallModels).length;
      console.log("🚀 ~ fetchModels ~ modelsCount:", modelsCount);

      if (modelsCount === wordsCount) return;

      for (let i = 0; i < modelsCount; i++) {
        if (smallModels[i]) continue;

        console.log("Fetching model: ", i);

        const response = await get("words/get-class-key/" + i, token);

        if (response) {
          const word = response.word;

          const modelPath = await saveModel(
            response.model,
            `${word.class_key}/`
          );

          addSmallModel(
            {
              meaning: word.word,
              model_path: modelPath,
            },
            word.class_key
          );
        }
      }
    };

    fetchModels();
  }, [isConnected, user, token]);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);

      if (!token) {
        await logout();
        return;
      }

      const response = await get("users/me", token ? token : "");

      if (!response) await logout();

      await setSessionData(response.user, token);

      await refresh();
    };

    if (!isConnected) return;

    getToken();
  }, []);

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

    if (!response) await logout();

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
  };

  return (
    <SessionContext.Provider value={sessionContext}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
