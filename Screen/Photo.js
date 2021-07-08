import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            type: Camera.Constants.Type.back,
            uri: null
        };
    }

    async useEffect() {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {
            this.setState({ hasPermission: status === 'granted' });
        } /*else {
            Alert.alert("Accès refusé")
        }*/
    };
    async snap() {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo);
            this.setState({ uri: photo.uri })
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        this.useEffect();
        if (this.state.hasPermission == "null") {
            return <View />;
        }
        if (this.state.hasPermission == "false") {
            return <Text>Accès caméra refusé</Text>;
        }

        return (
            <View style={styles.container}>
                <Camera style={styles.camera} type={this.state.type} ref={ref => {
                    this.camera = ref;
                }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (this.state.type === Camera.Constants.Type.back) {
                                    this.setState({ type: Camera.Constants.Type.front });
                                } else {
                                    this.setState({ type: Camera.Constants.Type.back });
                                }
                            }}>
                            <Text style={styles.text}> Cam.Av/Ar </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.snap();
                            }}>
                            <Text style={styles.text}> photo </Text>
                        </TouchableOpacity>
                        <Button
                            color   = "#841584"
                            title   = "Position"
                            onPress={() => navigate("CustomMap")}
                        />
                    </View>
                </Camera>
                <View style={styles.camera}>
                    <Image style={{ flex: 1 }} source={{ uri:this.state.uri ? this.state.uri:'https://reactnative.dev/img/tiny_logo.png' }}>
                    </Image>
                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    buttonContainer: {
        flex: 0.15,
        backgroundColor: "#ffffee",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: '#000',
        fontSize: 20
    },
    camera: {
        flex: 1,
        
    },
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        backgroundColor: "#ffffff",
        marginTop: 12,
    },
    input: {
        backgroundColor: "#ffffff",
    },
    view: {
        height: 40
    }
});