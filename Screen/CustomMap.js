import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-map-clustering";



export default class CustomMap extends React.Component {
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
    setTimeout(()=>this.setState({marginBottom : 0}),100);
  }


  onChangeValue = initialRegion =>{

    // console.log(JSON.stringify(initialRegion));
    // console.log("latitude "+initialRegion.latitude);
    
    

    this.setState({
      initialRegion
    });
  }

  onMapPress(e) {
    // alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate.latitude));
    const latitude = e.nativeEvent.coordinate.latitude;
    const longitude = e.nativeEvent.coordinate.longitude;
    const { navigate } = this.props.navigation;
  

    this.setState({
      marker: [
        {
          coordinate: e.nativeEvent.coordinate
        }
      ]
    });

    navigate("Declaration", { latitude: latitude, longitude: longitude });


  }

emplacement_DB() {
    db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM emplacements",
          (tx, { rows }) => {
            console.log(rows);
          },
          (tx, error) => {
            console.log("erreur de traitement");
          }
        );
    });
}

  async useEffect() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    // console.log(status);
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

        <MapView style                  = {styles.map}
                 showsUserLocation      = {true}
                 showsMyLocationButton  = {true}
                 initialRegion          = {this.state.initialRegion}
                 onRegionChangeComplete = {this.onChangeValue}
                 onPress                = {this.onMapPress.bind(this)}
        //ref ={ref => this.map = ref}        
        >

    {/* {data.map((marker, index) => { 
      const coords = {
        latitude: marker.latitude,
        longitude: marker.longitude,
    };   
     return (
         <Marker
            key        = {index}
            coordinate = {coords}
            title      = {""+data.nbre_place}
            
         />
     );
    })}                      */}

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