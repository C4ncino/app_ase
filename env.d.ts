declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL: string;
    EXPO_PUBLIC_BLE_PREFIX: string;
    EXPO_PUBLIC_DATA_UUID: string;
    EXPO_PUBLIC_INSTANCE_UUID: string;
    EXPO_PUBLIC_ACTIVE_UUID: string;
    EXPO_PUBLIC_BAT_UUID: string;
    EXPO_PUBLIC_PCT_UUID: string;
    // define more or use wildcard
  }
}
