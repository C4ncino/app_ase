const useEnv = () => {
  const envVars = {
    apiURL: process.env.EXPO_PUBLIC_API_URL,
    blePrefix: process.env.EXPO_PUBLIC_BLE_PREFIX,
    dataUUID: process.env.EXPO_PUBLIC_DATA_UUID,
    instanceUUID: process.env.EXPO_PUBLIC_INSTANCE_UUID,
    batteryUUID: process.env.EXPO_PUBLIC_BAT_UUID,
    percentageUUID: process.env.EXPO_PUBLIC_PCT_UUID,
  };

  Object.entries(envVars).map(([key, value]) => {
    if (!value) throw new Error(`Missing environment variable: ${key}`);
  });

  return envVars;
};

export default useEnv;
