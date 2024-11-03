type NetworkContextModel = {
  isConnected: boolean;
  lookForConnection: () => Promise<boolean>;
};
