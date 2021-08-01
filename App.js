import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./navigation/navigation";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation></Navigation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
