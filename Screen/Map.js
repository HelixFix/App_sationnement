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
    // this.onRegionChange = this.onRegionChange.bind(this)

  }


  componentDidMount() {
    this.handleUserLocation();
    setTimeout(()=>this.setState({marginBottom : 0}),100)
  }

  handleUserLocation=() => {
    navigator.geolocation.getCurrentPosition(pos => {
    //  alert(Json.stringify(pos))
    this.map.animateToRegion({
      ...this.state.initialRegion,
      latitude : pos.coords.latitude,
      longitude : pos.coords.longitude
    })

    this.state({
      ...this.state.initialRegion,
      latitude : pos.coords.latitude,
      longitude : pos.coords.longitude
      // latitude : this.state.location ? pos.coords.latitude : 37,
      // longitude : this.state.location ? pos.coords.longitude : 122
    })
    },
    err => {
      console.log(err);
      alert('Something Went Wrong ! Please select location manually.')
    }
    )
    // alert("Executed")
  }

  onRegionChange() {
    this.setState({
      region: {
        latitude: this.state.location ? this.state.location.coords.latitude: 37,
        longitude: this.state.location ? this.state.location.coords.longitude: 122,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })
  }

  async useEffect() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      this.setState({ ErrorMsg: "Permission to access location was denied" });
      return;
    }

 
    const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync()
    
  }

onChangeValue = initialRegion =>{
  // alert(JSON.stringify(region))
  ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)
  this.setState({
    initialRegion
  })
}

 

  render() {
    // this.useEffect()
   

    return (
      <View style={{flex:1,marginBottom : this.state.marginBottom}}>
        <MapView style={styles.map}
        showsUserLocation = {true}
        showsMyLocationButton = {true}
        region={this.state.location}
        // onRegionChange={this.onRegionChange}
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
