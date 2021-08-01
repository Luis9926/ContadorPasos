import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ResumenConteo from "../../components/ResumenConteo";
const Stack = createStackNavigator();

export default function ResumenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Resumen"
        component={ResumenConteo}
        options={{ title: "Resumen" }}
      />
    </Stack.Navigator>
  );
}
