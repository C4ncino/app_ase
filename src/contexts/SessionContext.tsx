import React, { useState } from "react";

export const SessionContext = React.createContext<SessionContextModel>({
  name: "",
});

type Props = {
  children: React.ReactNode;
};

const SessionContextProvider = ({ children }: Props) => {
  const [name, setName] = useState("Carlos");

  const sessionContext: SessionContextModel = {
    name: name,
  };

  return (
    <SessionContext.Provider value={sessionContext}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
