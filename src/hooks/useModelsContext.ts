import { ModelsContext } from "@/contexts/ModelsContext";
import { useContext } from "react";

export const useModelsContext = () => {
  return useContext(ModelsContext);
};
