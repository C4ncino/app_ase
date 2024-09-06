import { View, Text } from "react-native";

interface Props {
  title: SectionTitle;
}

const TitleHeader = ({ title }: Props) => {
  return (
    <View className="m-2 ml-4 mt-5 p-2 w-9 bg-blue-100 rounded-full flex-row">
      <Text className="text-blue-600 text-center w-full font-bold">
        {title}
      </Text>
    </View>
  );
};

export default TitleHeader;
