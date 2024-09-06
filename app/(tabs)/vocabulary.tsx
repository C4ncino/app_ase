import { useEffect, useState } from "react";
import { View, Text, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleHeader from "@/components/Vocabulary/TitleHeader";
import WordListItem from "@/components/Vocabulary/WordListItem";

const Vocabulary = () => {
  const [wordsLists, setWordsLists] = useState<WordList[]>([]);

  useEffect(() => {
    // Get words for user
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Tu vocabulario</Text>
      </View>

      <SectionList
        className=""
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
