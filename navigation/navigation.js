import * as React from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PasosStack from "./stacks/PasosStack";
import UserStack from "./stacks/UserStack";
import ResumenStack from "./stacks/ResumenStack";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Usuario") {
              iconName = focused ? "people-circle" : "people-circle-outline";
            } else if (route.name === "Pasos") {
              iconName = focused ? "list" : "list";
            } else if (route.name === "Contador") {
              iconName = focused ? "stopwatch" : "stopwatch";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Contador"
          component={PasosStack}
          options={{ title: "Contador" }}
          options={
            ({ title: "Contador" },
            ({ navigation }) => {
              const { routes, index } = navigation.dangerouslyGetState();
              const { state: exploreState } = routes[index];
              let tabBarVisible = true;
              if (exploreState) {
                const { routes: exploreRoutes, index: exploreIndex } =
                  exploreState;
                const exploreActiveRoute = exploreRoutes[exploreIndex];
                if (exploreActiveRoute.name === "ConteoActual")
                  tabBarVisible = false;
              }
              return {
                tabBarVisible,
                title: "Contando",
                tabBarLabel: "Contador",
              };
            })
          }
        />
        <Tab.Screen
          name="Pasos"
          component={ResumenStack}
          options={{ title: "Resumen" }}
        />
        <Tab.Screen
          name="Usuario"
          component={UserStack}
          options={{ title: "Usuario" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
