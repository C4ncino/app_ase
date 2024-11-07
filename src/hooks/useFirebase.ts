import { useEffect, useMemo, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import useEnv from "./useEnv";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFirebase = () => {
  const {
    firebaseApiKey,
    firebaseAppId,
    firebaseMessagingId,
    firebaseProjectId,
  } = useEnv();

  const [url, setUrl] = useState<string>();

  const appInfo = useMemo(() => {
    const app = initializeApp({
      apiKey: firebaseApiKey,
      authDomain: `${firebaseProjectId}.firebaseapp.com`,
      projectId: firebaseProjectId,
      storageBucket: `${firebaseProjectId}.firebasestorage.app`,
      messagingSenderId: firebaseMessagingId,
      appId: firebaseAppId,
    });

    const db = getFirestore(app);
    const configCollection = collection(db, "config");

    return {
      app,
      db,
      configCollection,
    };
  }, [firebaseApiKey, firebaseAppId, firebaseMessagingId, firebaseProjectId]);

  const getValue = async () => {
    const localValue = await AsyncStorage.getItem("url");

    if (localValue) {
      setUrl(localValue);
    }

    const collectionData = await getDocs(appInfo.configCollection);

    const currentData = collectionData.docs[0].data();

    if (localValue === currentData.url) return localValue;

    setUrl(currentData.url);
    await AsyncStorage.setItem("url", currentData.url);
    return currentData.url;
  };

  useEffect(() => {
    getValue();
  }, []);

  return {
    url,
    getValue,
  };
};

export default useFirebase;
