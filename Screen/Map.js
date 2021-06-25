import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image, ToastAndroid } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      ErrorMsg: null,
      initialRegion  : {
        latitude      : 37.7507406,
        longitude     : 122.3417348,
        latitudeDelta : 0.0922,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height,
      },
      marginBottom: 1
    };


  }


  componentDidMount() {
    // this.handleUserLocation();
    setTimeout(()=>this.setState({marginBottom : 0}),100)
  }


  onChangeValue = initialRegion =>{
    // alert(JSON.stringify(region))
    ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)
    this.setState({
      initialRegion
    })
  }

  async useEffect() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      this.setState({ ErrorMsg: "Permission to access location was denied" });
      return;
    }

 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    // console.log(location);
    
  }

 

  render() {
    this.useEffect()
   

    return (
      <View style={{flex:1,marginBottom : this.state.marginBottom}}>
        <MapView style={styles.map}
        showsUserLocation = {true}
        showsMyLocationButton = {true}
        initialRegion = {this.state.initialRegion}
        onRegionChangeComplete = {this.onChangeValue}
        ref ={ref => this.map = ref}
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
