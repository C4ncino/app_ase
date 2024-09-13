import SignUpSvg from "@/svgs/SignUp";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { FontAwesome5, Entypo, Fontisto } from "@expo/vector-icons";
import DatePicker from "@/components/DatePicker";
import { messages } from "@/messages/signupMessages";
import { emailRegex } from "@/utils/regex";
import { useSessionContext } from "@/hooks/useSessionContext";

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
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bday, setBday] = useState<Date>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp } = useSessionContext();

  const onSubmit = async () => {
    if (!name || !lastName || !bday || !email || !password || !cpassword) {
      setError(messages[0]);
      return;
    }

    if (!emailRegex.test(email)) {
      setError(messages[1]);
      return;
    }

    if (password !== cpassword) {
      setError(messages[2]);
      return;
    }

    const success = await signUp({
      name,
      last_name: lastName,
      bday,
      email,
      password,
    });

    if (success) {
      router.push("/");
    }

    setError(messages[3]);
  };

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
        <View className="mt-4 h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
          <Entypo name="user" size={18} color="black" />
          <TextInput
            autoFocus
            value={name}
            onChangeText={setName}
            placeholder="Nombre(s)"
            className=" w-full pl-2 text-lg pr-4"
            autoCapitalize="words"
            autoComplete="given-name"
            returnKeyType="next"
            enterKeyHint="next"
            placeholderTextColor={"#8A9EA8"}
          />
        </View>

        <View className="mt-4 h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
          <Entypo name="user" size={18} color="black" />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Apellido(s)"
            className="w-full pl-2 text-lg pr-4"
            autoCapitalize="words"
            autoComplete="family-name"
            returnKeyType="next"
            enterKeyHint="next"
            placeholderTextColor={"#8A9EA8"}
          />
        </View>

        <View className="mt-4 h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
          <FontAwesome5 name="birthday-cake" size={18} color="black" />

          <DatePicker date={bday} setDate={setBday} />
        </View>

        <View className="mt-4 h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
          <Entypo name="mail" size={18} color="black" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            autoComplete="email"
            inputMode="email"
            keyboardType="email-address"
            className="w-full pl-2 text-lg"
            returnKeyType="next"
            enterKeyHint="next"
            autoCapitalize="none"
            placeholderTextColor={"#8A9EA8"}
          />
        </View>

        <View className="mt-4 h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
          <Fontisto name="locked" size={16} color="black" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            className="w-full pl-2 text-lg pr-4"
            returnKeyType="next"
            enterKeyHint="next"
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor={"#8A9EA8"}
          />
        </View>

        <View className="mt-4 h-12 bg-white flex-row items-center rounded-3xl px-3 focus:border-2 focus:border-blue-300">
          <Fontisto name="locked" size={16} color="black" />
          <TextInput
            value={cpassword}
            onChangeText={setCPassword}
            placeholder="Confirmar contraseña"
            className="w-full pl-2 text-lg pr-4"
            returnKeyType="send"
            enterKeyHint="send"
            autoCapitalize="none"
            secureTextEntry
            onEndEditing={onSubmit}
            placeholderTextColor={"#8A9EA8"}
          />
        </View>

        {error && (
          <Text className="text-red-500 text-center mt-2">{error}</Text>
        )}

        <Pressable style={styles.LoginButt} onPress={onSubmit}>
          <Text style={styles.textlog} className="font-bold text-lg">
            Regístrate
          </Text>
        </Pressable>

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
