import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { getNetworkStateAsync, NetworkStateType } from "expo-network";

interface Props extends PropsWithChildren {}

export const NetworkContext = createContext<NetworkContextModel>({
  isConnected: false,
  lookForConnection: () => Promise.resolve(false),
});

const NetworkContextProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    lookForConnection();
  }, []);

  const lookForConnection = async () => {
    const { type } = await getNetworkStateAsync();

    const hasConnection =
      type === NetworkStateType.WIFI || type === NetworkStateType.VPN;

    setIsConnected(hasConnection);

    return hasConnection;
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
