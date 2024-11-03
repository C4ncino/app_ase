import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBleContext } from "@/hooks/useBLEContext";

const BatteryLevel = () => {
  const { batteryLevel } = useBleContext();

  const getBatteryColor = () => {
    if (batteryLevel) {
      if (batteryLevel > 40) return "#35a766";
      else if (batteryLevel > 25) return "#facc15";
      else if (batteryLevel > 15) return "#f97316";
    }
    return "#f01e0f";
  };

  const getIcon = () => {
    if (batteryLevel) {
      if (batteryLevel > 90) return "battery-bluetooth";
      else if (batteryLevel > 80) return "battery-90-bluetooth";
      else if (batteryLevel > 70) return "battery-80-bluetooth";
      else if (batteryLevel > 60) return "battery-70-bluetooth";
      else if (batteryLevel > 50) return "battery-60-bluetooth";
      else if (batteryLevel > 40) return "battery-50-bluetooth";
      else if (batteryLevel > 30) return "battery-40-bluetooth";
      else if (batteryLevel > 20) return "battery-30-bluetooth";
      else if (batteryLevel > 10) return "battery-20-bluetooth";
    }
    return "battery-10-bluetooth";
  };

  return (
    <View className="flex-row items-center ">
      <Text className="text-sm">{batteryLevel}%</Text>
      <MaterialCommunityIcons
        name={getIcon()}
        size={20}
        color={getBatteryColor()}
      />
    </View>
  );
};

export default BatteryLevel;
