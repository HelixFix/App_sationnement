import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image, ToastAndroid } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion  : {
        latitude      : 37.7507406,
        longitude     : 122.3417348,
        latitudeDelta : 0.0922,
        longitudeDelta: 0.0122,
      },
    };

  }



onChangeValue = initialRegion =>{
  // alert(JSON.stringify(region))
  ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)
  this.setState({
    initialRegion
  })
}

 

  render() {
   

    return (
      <View style={styles.container}>
        <MapView style={styles.map}
        initialRegion = {this.state.initialRegion}
        onRegionChangeComplete = {this.onChangeValue}
        />
       
          
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
