import { PropsWithChildren } from "react";

import BLEContextProvider from "./BLEContext";
import SessionContextProvider from "./SessionContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ModelsContextProvider from "./ModelsContext";

const ContextWrapper = ({ children }: PropsWithChildren) => {
  return (
    <BLEContextProvider>
      <ModelsContextProvider>
        <SessionContextProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </SessionContextProvider>
      </ModelsContextProvider>
    </BLEContextProvider>
  );
};

export default ContextWrapper;
