import React from "react";
import Title from "../Components/Title";
import { StyleSheet, View, TextInput, Alert, Text, Image, ScrollView, Dimensions } from "react-native";
import Button from "../Components/Button";
import TexteInput from "../Components/TexteInput";
import {nameValidator, nboptValidator, nbValidator} from "../core/utils";
import * as SQLite from 'expo-sqlite';
import ModalDropdown from '@monchilin/react-native-dropdown';



export default class Declaration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rue      : "",
      num      : "",
      ville    : "Mulhouse",
      nb_place : "",
      type_stat: "",
      latitude : ""+this.props.route.params.latitude,
      longitude: ""+this.props.route.params.longitude,
      comment  : "",
    };
  }

  alerte() {
    Alert.alert("Erreur", "Veuillez remplir les champs avec *", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }

  onSavePressed() {
    const typestatError = nameValidator(this.state.type_stat);
    const rueError      = nameValidator(this.state.rue);
    const numError      = nboptValidator(this.state.num);
    const nbplaceError  = nbValidator(this.state.nb_place);

    const db            = SQLite.openDatabase("database.db");
   

    if (rueError || numError || nbplaceError || typestatError) {
      this.alerte();
    } 
  
    else { // Méthode SQLite 
      db.transaction (
        tx => {
          tx.executeSql("insert into emplacements (num, rue, ville, nb_place, type_stat, comment, photo) values (?, ?, ?, ?, ?, ?, ?)", 
          [this.state.num, this.state.rue, this.state.ville, this.state.nb_place, this.state.type_stat, this.state.comment, this.state.photo])
        }
      );
    }
  }


  

  render() {
    const { navigate } = this.props.navigation;

    return (
      
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        <Title title = "Déclaration" /> 

        <TexteInput
          placeholder  = "Latitude"
          value        = {this.state.latitude} 
        />

        <TexteInput
          placeholder  = "Longitude"
          value        = {this.state.longitude}          
        />

        <TexteInput
          readonly     = "true"
          placeholder  = "Ville"          
          value        = {this.state.ville}          
        />

        <TextInput
          style         = {{
            height     : 40,
            borderColor  : "red",
            borderWidth: 1,
            margin     : 10,
            width      : "80%",
            padding    : 10,
          }}
          placeholder  = "Rue"
          value        = {this.state.rue}
          onChangeText = {(text) => this.setState({ rue: text })}
        />

        <TextInput
          style         = {{
            height     : 40,
            borderColor  : "gray",
            borderWidth: 1,
            margin     : 10,
            width      : "40%",
            padding    : 10,
          }}
          placeholder  = "Numéro"
          value        = {this.state.num}
          onChangeText = {(text) => this.setState({ num: text })}
        />



        <TextInput
                style         = {{
                  height     : 40,
                  borderColor  : "red",
                  borderWidth: 1,
                  margin     : 10,
                  width      : "40%",
                  padding    : 10,
                }}          
          placeholder  = "Nombre de place"
          value        = {this.state.nb_place}
          onChangeText = {(text) => this.setState({ nb_place: text })}
        />

        <ModalDropdown 
        defaultLabel={'Type stationnement ˅'}
        dataSource={['Créneau', 'Bataille', 'Epi avant', 'Epi arrière']} 
        labelStyle={{ fontSize: 14 }}
        itemLabelStyle={{ fontSize: 14 }}
        />    

              
        <View style = {styles.buttonContainer}>
                <Image style={{width: Dimensions.get('window').width, resizeMode: 'contain'}}  source={require("../assets/type_stati.jpg")}/>
        </View>

        <TextInput
        style         = {{
          height     : 40,
          borderColor: "gray",
          borderWidth: 1,
          margin     : 10,
          width      : "90%",
          padding    : 10,
        }}          
          maxLength={36}
          placeholder  = "Commentaire"
          value        = {this.state.comment}
          onChangeText = {(text) => this.setState({ comment: text })}
        />
        

        <Button
          color   = "#841584"
          title   = "Enregistrement"
          onPress = {() => this.onSavePressed()}
        />
        </View>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: "#fff",
    alignItems     : "center",
    justifyContent : "center",
  },
  innerText: {
    color     : "#841584",
    fontWeight: "bold",
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    
  },
});