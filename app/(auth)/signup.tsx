import SignUpSvg from "@/svgs/SignUp";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { SetStateAction, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";

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
});

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  return (
    <SafeAreaView className="justify-start items-start w-full h-full">
      <SignUpSvg
        width="75%"
        height="25%"
        style={{
          marginHorizontal: "10%",
          marginVertical: "7%",
          borderWidth: 2,
        }}
      />
      <ScrollView className="w-full h-full px-5 rounded-md">
        <View className="flex-row mt-4 justify-center">
          <View className="flex-1 mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Entypo name="user" size={18} color="black" />
            <TextInput
              id="name"
              placeholder="Nombres"
              className=" w-full pl-2 text-lg pr-4"
            />
          </View>

          <View className="flex-1 ml-2 mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Entypo name="user" size={18} color="black" />
            <TextInput
              id="apellido"
              placeholder="Apellidos"
              className="w-full pl-2 text-lg pr-4"
            />
          </View>
        </View>
        <View className="mt-4 ">
          <View className=" mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <FontAwesome5 name="birthday-cake" size={18} color="black" />
            <TextInput
              id="name"
              placeholder="Nacimiento"
              className="w-full pl-2 text-lg"
            />
          </View>
        </View>

        <View className="mt-4">
          <View className="  mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Entypo name="mail" size={18} color="black" />
            <TextInput
              id="email"
              placeholder="E-mail"
              className="w-full pl-2 text-lg"
            />
          </View>
        </View>

        <View className="flex-row mt-4">
          <View className="flex-1 mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Fontisto name="locked" size={16} color="black" />
            <TextInput
              placeholder="Contraseña"
              className="w-full pl-2 text-lg pr-4"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <View className="flex-row mt-4">
          <View className="flex-1 mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Fontisto name="locked" size={16} color="black" />
            <TextInput
              placeholder="Confirmar contraseña"
              className="w-full pl-2 text-lg pr-4"
              secureTextEntry={true}
              value={cpassword}
              onChangeText={setCPassword}
            />
          </View>
        </View>

        {/* <View className="mt-6 mb-6">
          <Button title="Sign Up" color={"#00AAFF"} />
        </View> */}

        <TouchableOpacity style={styles.LoginButt}>
          <Text style={styles.textlog} className="font-bold text-lg">
            Regístrate
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-2">
          <Text className="text-sm  text-gray-600 mr-1">
            ¿Ya tienes cuenta?
          </Text>

          <Link
            href="/login"
            className="text-sm text-blue-500 underline font-bold"
          >
            <Text>Inicia sesión</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
