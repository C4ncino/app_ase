import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAPI from "@/hooks/useAPI";

export const SessionContext = React.createContext<SessionContextModel>({
  login: () => new Promise((resolve) => resolve("")),
  signUp: () => new Promise((resolve) => resolve("")),
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

const SessionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<Token>();
  const { get, post } = useAPI();

  const getToken = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");

    // if (!token) router.replace("/login");

    const response = await get("users/me", token ? token : "");

    // if (!response) router.replace("/login");

    setUser(response.data);
  }, [get]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const setSessionData = async (user: User, token: Token) => {
    setUser(user);

    setToken(token);

    await AsyncStorage.setItem("token", token);
  };

  const login = async () => {
    // make post request
    const response = await post("users/login", JSON.stringify({}));

    if (response) {
      setSessionData(response.data.user, response.data.token);
      router.navigate("/");
      return "Todo Listo";
    }
    return "Algo salio mal...";
  };

  const signUp = async () => {
    // make post request
    const response = await post("users/login", JSON.stringify({}));

    if (response) {
      setSessionData(response.data.user, response.data.token);
      router.navigate("/");
      return "Todo Listo";
    }

    return "Algo salio mal...";
  };

  const logout = async () => {
    setUser(undefined);

    setToken(undefined);
    await AsyncStorage.removeItem("token");

    router.push("/login");
  };

  const sessionContext: SessionContextModel = {
    user,
    token,
    login,
    signUp,
    logout,
  };

  return (
    <SessionContext.Provider value={sessionContext}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
