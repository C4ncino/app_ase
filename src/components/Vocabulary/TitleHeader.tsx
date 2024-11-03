import { View, Text } from "react-native";

interface Props {
  title: SectionTitle;
}

const TitleHeader = ({ title }: Props) => {
  return (
    <View className="m-2 ml-4 mt-5 p-2 w-10 h-10 items-center bg-blue-100 rounded-full flex-row">
      <Text
        className="text-blue-600 text-center w-full font-extrabold0"
        style={{ fontSize: 13 }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TitleHeader;
