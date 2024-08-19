import { SessionContext } from "@src/contexts/SessionContext";
import { useContext } from "react";

export const useSessionContext = () => {
  return useContext(SessionContext);
};
