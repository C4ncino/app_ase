import { PropsWithChildren } from "react";

import BLEContextProvider from "./BLEContext";
import SessionContextProvider from "./SessionContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ModelsContextProvider from "./ModelsContext";
import NetworkContextProvider from "./NetworkContext";

const ContextWrapper = ({ children }: PropsWithChildren) => {
  return (
    <BLEContextProvider>
      <NetworkContextProvider>
        <ModelsContextProvider>
          <SessionContextProvider>
            <SafeAreaProvider>{children}</SafeAreaProvider>
          </SessionContextProvider>
        </ModelsContextProvider>
      </NetworkContextProvider>
    </BLEContextProvider>
  );
};

export default ContextWrapper;
