import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Usuario from "../../components/Usuario";
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Usuario"
        component={Usuario}
        options={{ title: "Usuario" }}
      />
    </Stack.Navigator>
  );
}
