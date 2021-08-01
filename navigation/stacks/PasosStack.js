import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Contador from "../../components/Contador";
import ConteoActual from "../../components/ConteoActual";
const Stack = createStackNavigator();

export default function PasosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contador"
        component={Contador}
        options={{ title: "Contador" }}
      />
      <Stack.Screen
        name="ConteoActual"
        component={ConteoActual}
        options={{ title: "Contando" }}
      />
    </Stack.Navigator>
  );
}
