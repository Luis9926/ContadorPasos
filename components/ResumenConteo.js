import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Avatar, ListItem, Icon } from "react-native-elements";

export default function ResumenConteo() {
  return (
    <View>
      <Card style={styles.container}>
        <Avatar
          rounded
          size="xlarge"
          icon={{ name: "user", color: "white", type: "font-awesome" }}
          overlayContainerStyle={{ backgroundColor: "black" }}
        />
        <Text h2> Luis Angel </Text>
        <Text h5> CuchaMau </Text>
        <Card.Divider />

        <ListItem bottomDivider>
          <Icon name={"phone"} type="font-awesome" />
          <ListItem.Content>
            <ListItem.Title>Cantidad de Pasos</ListItem.Title>
            <ListItem.Subtitle>5,000</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <Icon name={"briefcase"} type="font-awesome" />
          <ListItem.Content>
            <ListItem.Title>Distancia Recorrida</ListItem.Title>
            <ListItem.Subtitle>5.05 KM</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Card>
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
