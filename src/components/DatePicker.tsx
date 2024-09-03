import { useState } from "react";
import { Text, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DatePicker = ({ date, setDate }: Props) => {
  const currentDate = new Date();
  const [show, setShow] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setShow(!show)}
        className="px-4 py-2 bg-slate-200 rounded-lg w-36"
      >
        {date ? (
          <Text className="text-lg text-center">
            {date.toLocaleDateString()}
          </Text>
        ) : (
          <Text className="text-lg text-center text-gray-500">dd/mm/yyyy</Text>
        )}
      </Pressable>
      {show && (
        <DateTimePicker
          mode="date"
          value={date || new Date()}
          display="spinner"
          maximumDate={new Date(currentDate.getFullYear() - 6, 11, 31)}
          minimumDate={new Date(currentDate.getFullYear() - 101, 0, 1)}
          onChange={(_, selectedDate) => {
            selectedDate && setDate(selectedDate);
            setShow(false);
          }}
        />
      )}
    </>
  );
};

export default DatePicker;
