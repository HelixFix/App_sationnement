import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default class Camera_use extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            type         : Camera.Constants.Type.back,
            uri          : null
        };
    }

    async useEffect() {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasPermission: status === 'granted'});
    }

    async snap() {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo);
            this.setState({uri: photo.uri})
        }
    }

    render() {
        this.useEffect()
        if (this.state.hasPermission === null) {
            return <View/>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        
        return (
            <View   style = {styles.container}>
            <Camera style = {styles.camera} type = {this.state.type} ref = {ref => {this.camera = ref;}}>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.setState({ type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    });
                  }}>
                  <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    this.snap()
                }}>
                    <Text style={styles.text }> Take photo </Text>
                </TouchableOpacity>
              </View>
            </Camera>
            <View style = {styles.buttonContainer}>
                <Image style={{flex: 1}} source={{uri: this.state.uri ? this.state.uri : 'https://reactnative.dev/img/tiny_logo.png'}}/>
            </View>
          </View>
        )
    }


   

} const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
        justifyContent : 'center',
        alignItems     : 'center',
            // width: "100%"
    },
    camera: {
        flex: 1,width:"100%"
    },
    buttonContainer: {
      flex           : 1,
      backgroundColor: 'transparent',
      flexDirection  : 'row',
      margin         : 50,
    },
    button: {
        width          : 130,
        borderRadius   : 4,
        backgroundColor: '#14274e',
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        height         : 40
      
    },
    text: {
      fontSize: 18,
      color   : 'white',
    },
    takePicture: {
        // width          : 70,
        // height         : 70,
        // bottom         : 0,
        // borderRadius   : 50,
        // backgroundColor: '#fff'
    }
  });
