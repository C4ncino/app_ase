import { NetworkContext } from "@/contexts/NetworkContext";
import { useContext } from "react";

export const useNetworkContext = () => {
  return useContext(NetworkContext);
};
