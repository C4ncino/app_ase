import useAPI from "@/hooks/useAPI";
import { useSessionContext } from "@/hooks/useSessionContext";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useState } from "react";
import { View, TextInput, Pressable } from "react-native";

interface Props {
  word: Word;
}

const WordListItem = ({ word }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localWord, setWord] = useState(word.word);
  const inputRef = useRef<TextInput>(null);

  const { put } = useAPI();
  const { token, refresh } = useSessionContext();

  const onUpdate = async () => {
    // const response = await put(
    //   `words/${word.id}`,
    //   JSON.stringify({ word: localWord }),
    //   token
    // );

    // if (response) {
    // setWord(response.word.word);
    setIsEditing(false);
    //   const words = await AsyncStorage.getItem("words");

    //   if (words) {
    //     const wordsList: WordList[] = JSON.parse(words);

    //     const updatedWordsList = wordsList.map((list) => {
    //       list.data.map((w) => {
    //         if (w.id === word.id) {
    //           w.word = response.word;
    //         }

    //         return w;
    //       });

    //       return list;
    //     });

    //     await AsyncStorage.setItem("words", JSON.stringify(updatedWordsList));
    //   }

    //   await refresh();
    // }
  };

  const onEditing = () => {
    if (inputRef.current) {
      inputRef.current.blur();

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      setIsEditing(true);
    }
  };

  const onCancel = () => {
    setWord(word.word);
    setIsEditing(false);
  };

  return (
    <View className="flex-row justify-between items-center mx-4 border-b-2 border-blue-400 mb-3">
      <TextInput
        ref={inputRef}
        className={`flex-1 py-1 ${isEditing ? "" : "text-gray-500"} ml-2`}
        readOnly={!isEditing}
        value={localWord}
        onChangeText={setWord}
        enterKeyHint="done"
        returnKeyType="done"
        onEndEditing={onUpdate}
      />

      {isEditing ? (
        <>
          <Pressable className="mr-2" onPress={onUpdate}>
            <Feather name="save" size={22} color="green" />
          </Pressable>
          <Pressable onPress={onCancel} className="mr-2">
            <Feather name="x" size={22} color="red" />
          </Pressable>
        </>
      ) : (
        <Pressable onPress={onEditing} className="mr-2">
          <Feather name="edit-3" size={22} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default WordListItem;
