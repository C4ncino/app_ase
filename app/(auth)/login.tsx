import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Fontisto, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginSvg from "@/svgs/Login";
import { emailRegex } from "@/utils/regex";
import { errors } from "@/messages/loginMessages";
import { useSessionContext } from "@/hooks/useSessionContext";

export default function Component() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const { login, hash } = useSessionContext();

  const handleLogin = async () => {
    setIsFetching(true);
    setError("");

    if (!email || !password) {
      setError(errors[0]);
      setIsFetching(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError(errors[1]);
      setIsFetching(false);
      return;
    }

    const success = await login({ email, password: hash(password) });

    if (!success) {
      setError(errors[2]);
      setIsFetching(false);
      return;
    }

    router.push("/");
  };

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
            <TextInput
              autoFocus
              autoComplete="email"
              inputMode="email"
              keyboardType="email-address"
              enterKeyHint="next"
              autoCapitalize="none"
              placeholder="Correo"
              placeholderTextColor={"#8A9EA8"}
              className="w-full pl-2 text-lg"
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View className="my-4">
          <View className="  mt-3  h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
            <Fontisto name="locked" size={18} color="black" />
            <TextInput
              secureTextEntry
              placeholder="Contraseña"
              placeholderTextColor={"#8A9EA8"}
              className="w-full pl-2 text-lg"
              value={password}
              onChangeText={setPassword}
              onEndEditing={handleLogin}
            />
          </View>
        </View>

        <Link
          href="#"
          className="text-sm text-gray-600 underline justify-center text-center"
        >
          <Text>¿Olvidaste tu contraseña?</Text>
        </Link>

        {error && (
          <Text className="text-red-500 text-center mt-2">{error}</Text>
        )}
        <View className="justify-center items-center">
          <Pressable
            disabled={isFetching}
            onPress={handleLogin}
            style={({ pressed }) => [
              {
                marginTop: pressed ? 30 : 26,
                justifyContent: "center",
                height: pressed ? 56 : 60,
                width: pressed ? 282 : 286,
                borderRadius: 100,
                borderColor: "#006699",
                borderWidth: 2,
                backgroundColor: "white",
                shadowColor: pressed ? "" : "black",
                shadowOpacity: pressed ? 0 : 0.25,
                shadowRadius: pressed ? 0 : 3.84,
                elevation: pressed ? 0 : 5,
              },
            ]}
          >
            {isFetching ? (
              <ActivityIndicator size={24} color={"#006699"} />
            ) : (
              <View className="items-center">
                <Text className="font-bold text-lg">Iniciar sesión</Text>
              </View>
            )}
          </Pressable>
        </View>

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
