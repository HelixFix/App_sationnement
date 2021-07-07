import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, Image, ToastAndroid } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import data from '../core/data_Mulhouse.json';



export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      ErrorMsg: null,
      initialRegion  : {
        latitude      : 47.7471564615,
        longitude     : 7.32070858826,
        latitudeDelta : 0.0922,
        longitudeDelta: Dimensions.get('window').width*0.25 / Dimensions.get('window').height*0.25,
      },
      marginBottom: 1,      
    }
    this.mapMarkers=this.mapMarkers.bind(this)

  }


  componentDidMount() {
    // this.handleUserLocation();
    setTimeout(()=>this.setState({marginBottom : 0}),100);
  }


  onChangeValue = initialRegion =>{
    //var mapRef = useRef();
    // alert(JSON.stringify(region))
    //mapRef.current.onChangeValue(initialRegion, 2000)
    //ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)
    this.setState({
      initialRegion
    });
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


 
  mapMarkers(element,index) {    
      return (     
        <Marker
          key={index.key}
          coordinate={{ latitude: index.latitude, longitude: index.longitude }}
          title={""+index.nbre_place}      
        >
        </Marker >)  
  }

  render() {
    this.useEffect();
 
    return (
      <View style={{flex:1,marginBottom : this.state.marginBottom}}>
        <MapView style={styles.map}
        showsUserLocation = {true}
        showsMyLocationButton = {false}
        initialRegion = {this.state.initialRegion}
        onRegionChangeComplete = {this.onChangeValue}
        //ref ={ref => this.map = ref}        
        >

    {data.map((data, index) => { 
      const coords = {
        latitude: data.latitude,
        longitude: data.longitude,
    };   
     return (
         <Marker
            key={index}
            coordinate={coords}
            title={""+data.nbre_place}
            description={""+data.nbre_place}
         />
     );
    })}                     

        </MapView>          
       
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
