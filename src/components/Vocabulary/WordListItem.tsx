import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, TextInput, Pressable } from "react-native";

interface Props {
  word: Word;
}

const WordListItem = ({ word }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View className="flex-row justify-between mx-4 border-b-2 border-blue-600">
      <TextInput className="flex-1" readOnly={!isEditing} value={word} />
      <Pressable onPress={() => setIsEditing(!isEditing)}>
        {isEditing ? (
          <Feather name="edit-3" size={24} color="blue" />
        ) : (
          <Feather name="x" size={24} color="red" />
        )}
      </Pressable>
    </View>
  );
};

export default WordListItem;
