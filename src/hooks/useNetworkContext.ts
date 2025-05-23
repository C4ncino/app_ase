import { useContext } from "react";
import { NetworkContext } from "@/contexts/NetworkContext";

export const useNetworkContext = () => {
  return useContext(NetworkContext);
};
