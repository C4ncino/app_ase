import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Slot } from "expo-router";

const Layout = () => {
  return (
    // <LinearGradient colors={["#FFFFFF", "#FF8D1A"]} style={styles.container}>
    <View style={styles.content}>
      {/* <LinearGradient
        // Background Linear Gradient
        colors={["rgb(255,255,255)", "rgb(255,141,26)"]}
        style={styles.container}
      /> */}
      <Slot />

      {/* <View style={styles.BackgBotton}> */}

      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E5F7FF",
  },
  BackgBotton: {
    position: "absolute",
    bottom: 0,
    width: 400,
    height: "60%",
    backgroundColor: "#EAEEF0",
    padding: 16,
    // justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    width: 200,
    height: 150,
    position: "absolute", // Hacer que la posición sea absoluta
    top: 10, // Distancia desde la parte superior de la pantalla
    left: 50, // Distancia desde la parte izquierda de la pantalla
  },
});

export default Layout;
