import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Avatar, ListItem, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-elements";
export default function VistaContador(props) {
  var state = props.props;
  console.log(state);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {state.isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {state.pastStepCount}</Text>
      <Text>Walk! And watch this go up: {state.currentStepCount}</Text>
      <Button
        title="Solid Button"
        onPress={() => navigation.navigate("ConteoActual")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  avatar: {
    marginLeft: 46,
    marginBottom: 30,
  },
});
