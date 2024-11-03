import { useCallback, useState } from "react";
import Popover from "react-native-popover-view";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import useAPI from "@/hooks/useAPI";
import { useNetworkContext } from "@/hooks/useNetworkContext";
import { useSessionContext } from "@/hooks/useSessionContext";

import TitleHeader from "@/components/Vocabulary/TitleHeader";
import WordListItem from "@/components/Vocabulary/WordListItem";

const Vocabulary = () => {
  const [wordsLists, setWordsLists] = useState<WordList[]>([]);

  const { get } = useAPI();
  const { user, token, refresh } = useSessionContext();
  const { lookForConnection } = useNetworkContext();

  useFocusEffect(
    useCallback(() => {
      const getWords = async () => {
        const dbWords = await AsyncStorage.getItem("words");

        if (dbWords && dbWords !== "[]") setWordsLists(JSON.parse(dbWords));

        const hasConnection = await lookForConnection();

        if (!hasConnection) return;

        if (!user && !token) router.replace("/login");

        const response = await get(`words/${user?.id}`, token);

        if (response) {
          await refresh();

          if (dbWords && JSON.stringify(response.words) === dbWords) return;

          setWordsLists(response.words);

          await AsyncStorage.setItem("words", JSON.stringify(response.words));
        }
      };

      getWords();
    }, [user])
  );

  return (
    <SafeAreaView>
      <View className="mx-8 bg-gray-200 py-3 px-4 mb-4 rounded-3xl -mt-4 flex-row justify-between items-center relative">
        <Text className="text-lg text-center font-semibold text-blue-600 flex-1">
          Vocabulario
        </Text>
        <View className="right-4">
          <Popover
            from={
              <Pressable>
                <Octicons name="info" size={24} color="#6C8693" />
              </Pressable>
            }
            popoverStyle={{
              width: 360,

              paddingHorizontal: 12,
              paddingVertical: 12,
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text className="text-base text-justify ">
              Aquí podras ver todas las palabras que has entrenado, si gustas
              agregar más palabras ve a la pantalla de entrenamiento.
            </Text>
          </Popover>
        </View>
      </View>
      <SectionList
        className="mx-4 px-2 bg-white rounded-3xl h-[91%]"
        keyExtractor={(item, _) => item.id.toString()}
        sections={wordsLists}
        renderItem={({ item }) => <WordListItem word={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <TitleHeader title={title} />
        )}
        ListEmptyComponent={
          <View className="w-full h-full items-center justify-center py-56">
            <MaterialCommunityIcons
              name="clipboard-text-off-outline"
              size={65}
              color="#f55347"
            />
            <Text className="text-base">No hay palabras aún...</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Vocabulary;
