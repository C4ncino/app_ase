import { View, Text, Pressable, Button } from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";
import { router } from "expo-router";
import TranslateSVG from "@/svgs/Translate";
import useModelsFiles from "@/hooks/useFile";

const Home = () => {
  const session = useSessionContext();
  const { saveFile, readFile } = useModelsFiles();

  return (
    <View className="justify-start bg-blue-40 items-center w-full h-full ">
      <View
        style={{
          width: 250,
          height: 250,
          marginTop: "40%",
          borderRadius: 125,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
        className="border-2 border-black"
      >
        <TranslateSVG width="80%" height="80%" />
      </View>
      <Pressable
        onPress={() => router.push("/translate")}
        className="mt-5 justify-center bg-white h-14 w-72 rounded-3xl border-2 border-blue-700"
      >
        <Text className="w-72 text-center font-bold text-lg text-blue-800">
          Iniciar traducción
        </Text>
      </Pressable>

      <Button
        onPress={async () => {
          try {
            await saveFile({ salud: "hola" }, "prueba2.json");
            console.log("Archivo guardado");
          } catch (error) {
            console.error("Error guardando el archivo:", error);
          }
        }}
        title="Guardar"
      />
      <Button
        onPress={async () => {
          try {
            const data = await readFile("prueba1.json");
            console.log("Contenido del archivo:", data);
          } catch (error) {
            console.error("Error leyendo el archivo:", error);
          }
        }}
        title="Leer"
      />
    </View>
  );
};
export default Home;
