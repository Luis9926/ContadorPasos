import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Avatar, ListItem, Icon, Tile } from "react-native-elements";

export default function ResumenConteo() {
  return (
    <View>
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Tile
          imageSrc={require("../assets/exer.jpg")}
          imageContainerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          title="Resultados"
          caption="Conteo Final"
          captionStyle={{ fontSize: 15 }}
          titleStyle={{ fontSize: 30 }}
          featured
          height={250}
        />
      </View>

      <Card style={styles.container}>
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
