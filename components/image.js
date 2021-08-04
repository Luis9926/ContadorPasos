import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {
  Card,
  Avatar,
  ListItem,
  Icon,
  Slider,
  Divider,
  Tile,
  Image,
} from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-elements";
import CircularSlider from "@fseehawer/react-circular-slider";
import { ScrollView } from "react-native-gesture-handler";

export default function Imagen() {
  const [ObjetivoPasos, setObjetivoPasos] = useState(5000);

  const navigation = useNavigation();
  const image = () => (
    <Image source={require("../assets/run.png")} height={250} />
  );
  return (
    <View>
      <Image
        source={require("../assets/run.png")}
        style={{
          width: 600,
          height: 250,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 100,
    width: "90%",
    alignSelf: "center",
  },
  button: {
    width: "90%",
    alignItems: "center",
    textAlign: "center",
  },
  slider: {
    width: "80%",
    marginLeft: 40,
    marginTop: 10,
  },
  sliderContainer: {
    alignItems: "stretch",
    textAlign: "center",
  },
});
