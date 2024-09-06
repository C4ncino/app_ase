import LoginSvg from "@/svgs/Login";
import React, { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
const styles = StyleSheet.create({
  LoginButt: {
    backgroundColor: "#0088cc",
    borderRadius: 100,
    marginTop: 20,
    height: 50,
  },
  textlog: {
    textAlign: "center",
    padding: 10,
    fontStyle: "normal",
    color: "#FFFFFF",
  },

  inputContainer: {
    flexDirection: "row",
  },
});
export default function Component() {
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="justify-start items-start w-full h-full px-0">
      <LoginSvg
        width="75%"
        height="25%"
        style={{
          marginHorizontal: "10%",
          borderWidth: 2,
        }}
      />
      <Text className="text-4xl font-bold mb-2 mt-5 text-blue-800 text-center w-full">
        Bienvenido
      </Text>
      <Text className="text-4xl font-bold mb-2 text-blue-800 text-center w-full">
        TR Glove
      </Text>

      <View className="w-full h-full px-5 rounded-md">
        <View className=" mt-2">
          <View className="  mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Entypo name="mail" size={18} color="black" />
            <TextInput placeholder="E-mail" className="w-full pl-2 text-lg" />
          </View>
        </View>

        <View className="my-4">
          <View className="  mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Fontisto name="locked" size={18} color="black" />
            <TextInput
              placeholder="Contraseña"
              className="w-full pl-2 text-lg"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <Link
          href="#"
          className="text-sm text-gray-600 underline justify-center text-center"
        >
          <Text>¿Olvidaste tu contraseña?</Text>
        </Link>
        {/* 
        <View className="mt-6 10">
          <Button title="Log In" />
        </View> */}

        <TouchableOpacity style={styles.LoginButt}>
          <Text style={styles.textlog} className="font-bold text-lg">
            Iniciar sesión
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-sm  text-gray-600 mr-1">
            ¿No tienes cuenta?
          </Text>

          <Link
            href="/signup"
            className="text-sm text-blue-500 underline font-bold"
          >
            <Text>Registrate</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
