import ContextWrapper from "@src/contexts/ContextWrapper";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <ContextWrapper>
      <Stack screenOptions={{ headerShown: false }} />
    </ContextWrapper>
  );
};

export default Layout;
