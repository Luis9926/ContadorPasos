import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
import VistaContador from "./VistaContador";
export default class Contador extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    console.log(this.props);
    this._subscription = Pedometer.watchStepCount((result) => {
      console.log("pasos", result);
      this.setState({
        currentStepCount: result.steps,
      });

      if (result.steps > this.props) {
      }
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      (error) => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      }
    );
    //  const navigation = useNavigation();
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        this.setState({ pastStepCount: result.steps });
      },
      (error) => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.centerText}>
        <Text style={{ fontSize: 32, color: "white" }}>Pasos</Text>
        <Text
          style={{ fontSize: 24, marginTop: 5, marginLeft: 40, color: "white" }}
        >
          {this.state.currentStepCount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  lowerContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  centerText: {
    textAlign: "center",
    alignContent: "center",
  },
});
