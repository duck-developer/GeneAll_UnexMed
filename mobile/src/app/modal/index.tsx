import { View, Text, StyleSheet } from "react-native";
import React from "react";

const modal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Erro ao se conectar com o banco!</Text>
    </View>
  );
};

export default modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // fundo escuro
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});
