import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import Contador from "./Contador";
import MapView, { Geojson, Polygon, Polyline } from "react-native-maps";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
  }
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function computeDistance([prevLat, prevLong], [lat, long]) {
  const prevLatInRad = toRad(prevLat);
  const prevLongInRad = toRad(prevLong);
  const latInRad = toRad(lat);
  const longInRad = toRad(long);

  return (
    // In kilometers
    6377.830272 *
    Math.acos(
      Math.sin(prevLatInRad) * Math.sin(latInRad) +
        Math.cos(prevLatInRad) *
          Math.cos(latInRad) *
          Math.cos(longInRad - prevLongInRad)
    )
  );
}

function toRad(angle) {
  return (angle * Math.PI) / 180;
}

export default function ConteoActual(props) {
  const [ObjetivoPasos, setObjetivoPasos] = useState(props.route.params.pasos);
  const navigation = useNavigation();
  const [state, setState] = useState({ region: null, polygon: [], error: "" });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coordenadas, setcoordenadas] = useState([]);

  const requestPermissions = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000,
      });

      var location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (newLocation) => {
          let { coords } = newLocation;

          let region = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
          };
          let latlen = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };
          setLocation(newLocation);
          setState({ region: region });
          coordenadas.push(latlen);
          console.log(latlen);
        },
        (error) => console.log(error)
      );
      return location;
    }
  };

  const PermissionsButton = () => (
    <TouchableOpacity onPress={requestPermissions}>
      <Text>Enable background location</Text>
    </TouchableOpacity>
  );
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  requestPermissions();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];
  const [Distancia, setDistancia] = useState(0);
  useEffect(() => {
    if (coordenadas.length > 2) {
      setDistancia(
        computeDistance(
          [
            coordenadas[coordenadas.length - 2].latitude,
            coordenadas[coordenadas.length - 2].longitude,
          ],
          [
            coordenadas[coordenadas.length - 1].latitude,
            coordenadas[coordenadas.length - 1].longitude,
          ]
        )
      );
      console.log("Distancia", Distancia);
    }
    return () => {};
  }, []);

  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  console.log(props.route.params);
  useEffect(() => {
    let isCancelled = false;

    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        !isCancelled &&
          setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    advanceTime();

    return () => {
      //final time:
      //console.log(time);
      isCancelled = true;
    };
  }, [time]);
  return (
    <ScrollView>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground
        source={require("../assets/camino.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <MapView
          style={styles.map}
          showsUserLocation={true}
          userLocationPriority="balanced"
          region={state.region}
          customMapStyle={mapStyle}
        ></MapView>
        <Text
          h1
          style={{
            fontSize: 40,
            marginTop: 20,
            marginLeft: 30,
            color: "white",
          }}
        >
          Empieza a caminar
        </Text>
        <View style={{ marginLeft: 130, marginTop: 30 }}>
          <Text style={{ fontSize: 32, color: "white" }}>Objetivo</Text>
          <Text
            style={{
              fontSize: 24,
              marginTop: 5,
              marginLeft: 0,
              color: "white",
            }}
          >
            {ObjetivoPasos} pasos
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignContent: "center",
            textAlign: "center",
            marginLeft: 75,
          }}
        >
          <View style={styles.centerText}>
            <Contador props={{ ObjetivoPasos }}></Contador>
          </View>
          <View style={{ flexDirection: "column", marginLeft: 30 }}>
            <Text style={{ fontSize: 32, color: "white" }}>Distancia</Text>
            <Text
              style={{
                fontSize: 24,
                marginTop: 5,
                marginLeft: 25,
                color: "white",
              }}
            >
              {Distancia} KM
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 130, marginTop: 20 }}>
          <Text style={{ fontSize: 32, color: "white" }}>Tiempo</Text>
          <Text
            style={{
              fontSize: 24,
              marginTop: 5,
              marginLeft: 10,
              color: "white",
            }}
          >
            {time.hours > 9 ? time.hours : "0" + time.hours}:
            {time.minutes > 9 ? time.minutes : "0" + time.minutes}:
            {time.seconds > 9 ? time.seconds : "0" + time.seconds}
          </Text>
        </View>
        <View style={{ marginBottom: 70, marginTop: 50 }}>
          <Icon
            style={{ marginTop: 130 }}
            name="pause-circle"
            type="font-awesome"
            color="#EF8033"
            size={120}
            onPress={() => navigation.navigate("Contador")}
            solid
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width - 50,
    height: 200,
    marginLeft: 25,
    marginTop: 40,
  },
  centerText: {
    textAlign: "center",
    alignContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
