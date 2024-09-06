import { useEffect, useState } from "react";
import { SectionList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleHeader from "@/components/Vocabulary/TitleHeader";
import WordListItem from "@/components/Vocabulary/WordListItem";

const Vocabulary = () => {
  // TODO: change to context
  const [wordsLists, setWordsLists] = useState<WordList[]>([
    {
      title: "Aa",
      data: [
        {
          id: 1,
          literal: "Abaco",
        },
        {
          id: 2,
          literal: "Abeja",
        },
        {
          id: 3,
          literal: "Abismo",
        },
      ],
    },
    {
      title: "Bb",
      data: [
        {
          id: 1,
          literal: "Baba",
        },
        {
          id: 2,
          literal: "Baba",
        },
        {
          id: 3,
          literal: "Baba",
        },
      ],
    },
    {
      title: "Cc",
      data: [
        {
          id: 1,
          literal: "Cacho",
        },
        {
          id: 2,
          literal: "Cacho",
        },
        {
          id: 3,
          literal: "Cacho",
        },
      ],
    },
    {
      title: "Dd",
      data: [
        {
          id: 1,
          literal: "Dedo",
        },
        {
          id: 2,
          literal: "Dedo",
        },
        {
          id: 3,
          literal: "Dedo",
        },
      ],
    },
  ]);

  useEffect(() => {
    // Get words for user
  }, []);

  return (
    <SafeAreaView>
      <View className="mx-8 bg-gray-200 py-3 mb-4 rounded-3xl -mt-4">
        <Text className="text-lg text-center font-semibold text-blue-600">
          Vocabulario
        </Text>
      </View>

      <SectionList
        className="mx-4 px-2 bg-white rounded-3xl h-[91%]"
        keyExtractor={(_, i) => i.toString()}
        sections={wordsLists}
        renderItem={({ item }) => <WordListItem word={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <TitleHeader title={title} />
        )}
      />
    </SafeAreaView>
  );
};

export default Vocabulary;
