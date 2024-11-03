import { useContext } from "react";
import { BLEContext } from "@/contexts/BLEContext";

export const useBleContext = () => {
  return useContext(BLEContext);
};
