import { useCallback, useState } from "react";
import { SectionList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleHeader from "@/components/Vocabulary/TitleHeader";
import WordListItem from "@/components/Vocabulary/WordListItem";
import { Feather } from "@expo/vector-icons";
import { Link, router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAPI from "@/hooks/useAPI";
import { useSessionContext } from "@/hooks/useSessionContext";

const Vocabulary = () => {
  const [wordsLists, setWordsLists] = useState<WordList[]>([]);

  const { get } = useAPI();
  const { user, token, refresh } = useSessionContext();

  useFocusEffect(
    useCallback(() => {
      const getWords = async () => {
        const dbWords = await AsyncStorage.getItem("words");

        if (dbWords && dbWords !== "[]") setWordsLists(JSON.parse(dbWords));

        if (!user && !token) router.replace("/login");

        const response = await get(`words/${user?.id}`, token);

        if (response) {
          if (dbWords && JSON.stringify(response.words) === dbWords) return;

          setWordsLists(response.words);
          await AsyncStorage.setItem("words", JSON.stringify(response.words));

          refresh();
        }
      };

      getWords();
    }, [user, token])
  );

  return (
    <SafeAreaView>
      <View className="mx-8 bg-gray-200 py-3 px-4 mb-4 rounded-3xl -mt-4 flex-row justify-between items-center relative">
        <Text className="text-lg text-center font-semibold text-blue-600 flex-1">
          Vocabulario
        </Text>

        <View className="border-2 border-green-500 rounded-full flex items-baseline absolute right-4">
          <Link href="/train">
            <Feather name="plus" size={24} color="green" />
          </Link>
        </View>
      </View>
      {wordsLists.length === 0 ? (
        <Text>No hay palabras aún...</Text>
      ) : (
        <SectionList
          className="mx-4 px-2 bg-white rounded-3xl h-[91%]"
          keyExtractor={(item, _) => item.id.toString()}
          sections={wordsLists}
          renderItem={({ item }) => <WordListItem word={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <TitleHeader title={title} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Vocabulary;
