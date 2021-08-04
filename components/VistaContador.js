import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
import Imagen from "./image";

export default function VistaContador() {
  const [ObjetivoPasos, setObjetivoPasos] = useState(5000);

  const navigation = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
      <Tile
        imageSrc={require("../assets/run.png")}
        imageContainerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        title="Monitorea Tus Pasos"
        caption="Empieza a contar tus pasos"
        captionStyle={{ fontSize: 15 }}
        titleStyle={{ fontSize: 30 }}
        featured
        height={250}
      />

      <Divider
        style={{
          marginTop: 30,
          marginBottom: 30,
          marginLeft: 100,
          marginRight: 100,
        }}
        orientation="horizontal"
        width={10}
        color="black"
      />
      <View>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Establece un objetivo a completar
        </Text>
        <Text style={{ fontSize: 30, textAlign: "center", marginTop: 50 }}>
          {ObjetivoPasos} Pasos
        </Text>
      </View>
      <View>
        <Slider
          style={styles.slider}
          value={ObjetivoPasos}
          onValueChange={setObjetivoPasos}
          maximumValue={10000}
          minimumValue={20}
          step={1}
          trackStyle={{ height: 10, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="shoe-prints"
                type="font-awesome-5"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="tomato"
              />
            ),
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Icon
          name="play-circle"
          type="font-awesome-5"
          size={60}
          reverse
          containerStyle={{ bottom: 20, right: 20 }}
          color="tomato"
          onPress={() =>
            navigation.navigate("ConteoActual", { pasos: ObjetivoPasos })
          }
        />
      </View>
    </ScrollView>
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
    marginTop: 40,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 40,
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
