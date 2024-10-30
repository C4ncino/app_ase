import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAPI from "@/hooks/useAPI";
import { useBleContext } from "@/hooks/useBLEContext";

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

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await get("users/me", token ? token : "");

      if (!response) await logout();

      await setSessionData(response.user, token);

      await refresh();
    };

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

  const refresh = async () => {
    console.log(token);

    const response = await get("users/refresh", token);

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
