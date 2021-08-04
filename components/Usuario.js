import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Avatar, ListItem, Icon } from "react-native-elements";

export default function Usuario() {
  return (
    <View>
      <Card style={styles.container}>
        <View style={{ marginTop: 20, marginLeft: 90 }}>
          <Avatar
            rounded
            size="xlarge"
            icon={{ name: "user", color: "white", type: "font-awesome" }}
            overlayContainerStyle={{ backgroundColor: "black" }}
          />
          <View style={{ marginTop: 20, marginLeft: 10 }}>
            <Text style={{ fontSize: 30 }} h2>
              Luis Angel
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 25,
                marginTop: 10,
                marginBottom: 30,
              }}
              h5
            >
              CuchaMau
            </Text>
          </View>
        </View>

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
        <ListItem bottomDivider>
          <Icon name={"briefcase"} type="font-awesome" />
          <ListItem.Content>
            <ListItem.Title>Peso</ListItem.Title>
            <ListItem.Subtitle>80 Kg</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <Icon name={"briefcase"} type="font-awesome" />
          <ListItem.Content>
            <ListItem.Title>Estatura</ListItem.Title>
            <ListItem.Subtitle>1.77 M</ListItem.Subtitle>
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
