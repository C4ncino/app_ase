import { useContext } from "react";
import { ModelsContext } from "@/contexts/ModelsContext";

export const useModelsContext = () => {
  return useContext(ModelsContext);
};
