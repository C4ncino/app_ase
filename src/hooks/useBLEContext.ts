import { BLEContext } from "@src/contexts/BLEContext";
import { useContext } from "react";

export const useBleContext = () => {
  return useContext(BLEContext);
};
