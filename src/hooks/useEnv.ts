const useEnv = () => {
  const envVars = {
    blePrefix: process.env.EXPO_PUBLIC_BLE_PREFIX,
    dataUUID: process.env.EXPO_PUBLIC_DATA_UUID,
    activeUUID: process.env.EXPO_PUBLIC_ACTIVE_UUID,
    instanceUUID: process.env.EXPO_PUBLIC_INSTANCE_UUID,
    batteryUUID: process.env.EXPO_PUBLIC_BAT_UUID,
    percentageUUID: process.env.EXPO_PUBLIC_PCT_UUID,
    firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    firebaseMessagingId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_ID,
  };

  Object.entries(envVars).map(([key, value]) => {
    if (!value) throw new Error(`Missing environment variable: ${key}`);
  });

  return envVars;
};

export default useEnv;
