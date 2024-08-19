import { PropsWithChildren } from "react";

import BLEContextProvider from "./BLEContext";
import SessionContextProvider from "./SessionContext";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ContextWrapper = ({ children }: PropsWithChildren) => {
  return (
    <BLEContextProvider>
      <SessionContextProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </SessionContextProvider>
    </BLEContextProvider>
  );
};

export default ContextWrapper;
