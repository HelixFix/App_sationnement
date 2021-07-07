import React, { Component } from "react";
import Title from "../Components/Title";
import { StyleSheet, View, Text, Alert, Image } from "react-native";
import Button from "../Components/Button";
import TexteInput from "../Components/TexteInput";
import {nameValidator, nboptValidator, nbValidator} from "../core/utils";
import * as SQLite from 'expo-sqlite';
//import { Dropdown } from 'react-native-material-dropdown-v2-fixed';



export default class Declaration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rue      : "",
      num      : "",
      ville    : "Mulhouse",
      nb_place : "",
      type_stat: "",
      latitude : "",
      longitude: "",
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
    //var user = [];

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
      this.props.navigation.navigate("CustomMap");
    }
  }


  

  render() {
    const { navigate } = this.props.navigation;
    let data = [
      {      value: 'Banana',    },
      {      value: 'Mango',    },
      {      value: 'Pear',    }];   



    return (
      <View style={styles.container}>
        <Title title = "Déclaration" />

        <TexteInput
          borderColor  = "red"
          placeholder  = "Rue"
          value        = {this.state.rue}
          onChangeText = {(text) => this.setState({ rue: text })}
        />

        <TexteInput
          placeholder  = "Numéro"
          value        = {this.state.num}
          onChangeText = {(text) => this.setState({ num: text })}
        />

        <TexteInput
          readonly     = "true"
          placeholder  = "Ville"
          value        = {this.state.ville}
          onChangeText = {(text) => this.setState({ ville: text })}
        />

        <TexteInput
          borderColor  = "red"
          placeholder  = "Nombre de place"
          value        = {this.state.nb_place}
          onChangeText = {(text) => this.setState({ nb_place: text })}
        />

        {/* <Dropdown
        icon='chevron-down'
        iconColor='#E1E1E1'
        label='Favorite Fruit'
        data={data}
      /> */}


        <View style = {styles.buttonContainer}>
                <Image style={{width: 350, resizeMode: 'contain'}}  source={require("../assets/type_stati.jpg")}/>
        </View>


        <TexteInput
          placeholder  = "Commentaire"
          value        = {this.state.comment}
          onChangeText = {(text) => this.setState({ comment: text })}
        />


        <Button
          color   = "#841584"
          title   = "Inscription"
          onPress = {() => this.onSavePressed()}
        />

        <Text>
          Déjà inscrit ?
          <Text
            style   = {styles.innerText}
            onPress = {() => navigate("LoginScreen")}
          >
            {" "}
            Connectez-vous
          </Text>
        </Text>
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
});

