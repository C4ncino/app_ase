import { PropsWithChildren } from "react";

import BLEContextProvider from "./BLEContext";
import SessionContextProvider from "./SessionContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ModelsContextProvider from "./ModelsContext";

const ContextWrapper = ({ children }: PropsWithChildren) => {
  return (
    <BLEContextProvider>
      <SessionContextProvider>
        <ModelsContextProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </ModelsContextProvider>
      </SessionContextProvider>
    </BLEContextProvider>
  );
};

export default ContextWrapper;
