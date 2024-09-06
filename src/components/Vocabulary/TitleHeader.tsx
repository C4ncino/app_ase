import { View, Text } from "react-native";

interface Props {
  title: SectionTitle;
}

const TitleHeader = ({ title }: Props) => {
  return (
    <View className="my-2 w-4 bg-blue-200 rounded-full">
      <Text className="text-blue-600">{title}</Text>
    </View>
  );
};

export default TitleHeader;
