import React, { useEffect, useState } from "react";

export const SessionContext = React.createContext<SessionContextModel>({
  login: () => {},
  signUp: () => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

const SessionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState("");

  const getToken = () => {
    // get token from async storage
  };

  useEffect(() => {
    // get token from async storage
    // Validate token
    // Get user from token
    //! set page to login
  }, []);

  const setSessionData = () => {
    // setUser(response.data)
    // setToken
    // save token to async storage
  };

  const login = () => {
    // make post request
    // Handle response
    // Set Session data
    //! return error message
  };

  const signUp = () => {
    // make post request
    // Handle response
    // Set Session data
    //! return error message
  };

  const logout = () => {
    // set user to undefined
    // set token to undefined
    // set page to login
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
