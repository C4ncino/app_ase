import { useContext } from "react";
import { SessionContext } from "@/contexts/SessionContext";

export const useSessionContext = () => {
  return useContext(SessionContext);
};
