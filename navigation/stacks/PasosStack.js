import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Contador from "../../components/Contador";
import ConteoActual from "../../components/ConteoActual";
import VistaContador from "../../components/VistaContador";
const Stack = createStackNavigator();

export default function PasosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contador"
        component={VistaContador}
        options={{ title: "Contador" }}
      />
      <Stack.Screen
        name="ConteoActual"
        component={ConteoActual}
        options={{ title: "Contando", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
