/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { NetInfo, StyleSheet, Text, View, Button } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialIsConnected: "Unknown",
      dynamicIsConnected: "Unknown",
      connectionType: "Unknown",
      effectiveType: "Unknown",
      observed: false
    };

    this.boundNetInfoHandler = this.handleIsConnectedChange.bind(this);
    // this.stopListeningToNetwork = this.stopListeningToNetwork.bind(this);
    // this.startListeningToNetwork = this.startListeningToNetwork.bind(this);
  }

  componentWillMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      this.setState({
        connectionType: connectionInfo.type,
        effectiveType: connectionInfo.effectiveType
      });
      // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });
    this.getIsConnected();
  }

  componentWillUnmount() {
    this.stopListeningToNetwork();
  }

  startListeningToNetwork() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.boundNetInfoHandler
    );
  }

  stopListeningToNetwork() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.boundNetInfoHandler
    )
  }

  getIsConnected() {
    NetInfo.isConnected.fetch().then(isConnected => {
      const connected = this.getConnectedDesc(isConnected);

      this.setState({ initialIsConnected: connected });
    });
  }

  handleIsConnectedChange(isConnected) {
    const connected = this.getConnectedDesc(isConnected);
    this.setState({ dynamicIsConnected: connected });
  }

  getConnectedDesc(isConnected) {
    return isConnected ? "Connected" : "Disconnected";
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`Manual: ${this.state.initialIsConnected}`}
        </Text>
        <Text style={styles.welcome}>
          {`Subscription: ${this.state.dynamicIsConnected}`}
        </Text>
        <Button onPress={() => this.getIsConnected()} title="Refresh" />
        <Button
          onPress={() => {
            if (this.state.observed) {
              this.stopListeningToNetwork();
            } else {
              this.startListeningToNetwork();
            }
            this.setState({observed: !this.state.observed})
          }}
          title={`${this.state.observed ? "Stop" : "Start"} Listening`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaf7fd"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
