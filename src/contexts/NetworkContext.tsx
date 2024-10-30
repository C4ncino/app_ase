import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { getNetworkStateAsync, NetworkStateType } from "expo-network";

interface Props extends PropsWithChildren {}

export const NetworkContext = createContext<NetworkContextModel>({
  isConnected: false,
  lookForConnection: () => {},
});

const NetworkContextProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    lookForConnection();
  }, []);

  const lookForConnection = async () => {
    const { type } = await getNetworkStateAsync();
    setIsConnected(
      type === NetworkStateType.WIFI || type === NetworkStateType.VPN
    );
  };

  const networkContext: NetworkContextModel = {
    isConnected,
    lookForConnection,
  };

  return (
    <NetworkContext.Provider value={networkContext}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkContextProvider;
