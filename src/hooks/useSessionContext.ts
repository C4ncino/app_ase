import { SessionContext } from "@/contexts/SessionContext";
import { useContext } from "react";

export const useSessionContext = () => {
  return useContext(SessionContext);
};
