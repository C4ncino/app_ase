import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, TextInput, Pressable } from "react-native";

interface Props {
  word: Word;
}

const WordListItem = ({ word }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localWord, setWord] = useState(word.literal);

  const onUpdate = () => {
    // TODO: update trough API
    setIsEditing(false);
  };

  return (
    <View className="flex-row justify-between items-center mx-4 border-b-2 border-blue-400 mb-3">
      <TextInput
        className={`flex-1 py-1 ${isEditing ? "" : "text-gray-500"} ml-2`}
        readOnly={!isEditing}
        value={localWord}
        onChangeText={setWord}
      />
      {isEditing && (
        <Pressable className="mr-2" onPress={onUpdate}>
          <Feather name="save" size={22} color="green" />
        </Pressable>
      )}

      <Pressable onPress={() => setIsEditing(!isEditing)} className="mr-2">
        {isEditing ? (
          <Feather name="x" size={22} color="red" />
        ) : (
          <Feather name="edit-3" size={22} color="black" />
        )}
      </Pressable>
    </View>
  );
};

export default WordListItem;
