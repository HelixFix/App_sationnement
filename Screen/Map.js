import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export default class Map extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      location: null,
      ErrorMsg: null,
      region  : {
        latitude      : 37.7507406,
        longitude     : 122.3417348,
        latitudeDelta : 0.0922,
        longitudeDelta: 0.5 * (screenWidth / screenHeight),
      },
    };
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  onRegionChange(region) {
    
    this.setState({
      region: {
        latitude: this.state.location ? this.state.location.coords.latitude: 37,
        longitude: this.state.location ? this.state.location.coords.longitude: 122,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0122,
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

 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    
  }


  render() {
    this.useEffect();

    return (
      
      <View style={styles.container}>
         <MapView style={styles.map} 
		 region={this.state.region}
		 onRegionChange={this.onRegionChange}
		>
		
		  <Marker
			key        = {1}
			coordinate = {{latitude: this.state.location ? this.state.location.coords.latitude : 47.7507406, longitude: this.state.location ? this.state.location.coords.longitude : 7.3417348}}
			// title={marker.title}
			title="Ma géoloc"
			// description={marker.description}
		  />
	  </MapView>
		 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    alignItems    : "center",
    justifyContent: "center",
    padding       : 20,
  },
  paragraph: {
    fontSize : 18,
    textAlign: "center",
  },
  map: {
    width : Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
