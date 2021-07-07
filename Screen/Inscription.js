import React from "react";
import Title from "../Components/Title";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import Button from "../Components/Button";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import TexteInput from "../Components/TexteInput";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../core/utils";
import * as SQLite from 'expo-sqlite'


export default class Inscription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name    : "",
      email   : "",
      password: "",
    };
  }

  alerte() {
    Alert.alert("Erreur", "Veuillez remplir correctement les champs", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }

  onSignUpPressed() {
    console.log("click");
    console.log(db);
    //console.log(this.props);

    const nameError     = nameValidator(this.state.name);
    const emailError    = emailValidator(this.state.email);
    const passwordError = passwordValidator(this.state.password);
    const db            = SQLite.openDatabase("database.db");
    //var user = [];

    if (nameError || emailError || passwordError) {
      this.alerte();
    } 
  
    else { // Méthode SQLite
      db.transaction (
        tx => {
          tx.executeSql("insert into user (name, mail, mdp) values (?, ?, ?)", [this.state.name, this.state.email, this.state.password])
        }
      );
      this.props.navigation.navigate("LoginScreen");
    }
  }


  

  render() {
    const { navigate } = this.props.navigation;

    
    // console.log(db);



 

    return (
      <View style={styles.container}>
        <Title title = "Inscription" />

        <TexteInput
          placeholder      = "Nom"
          autoCompleteType = "name"
          textContentType  = "name"
          autoCompleteType = "name"
          value            = {this.state.name}
          onChangeText     = {(text) => this.setState({ name: text })}
        />

        <EmailInput
          value        = {this.state.email}
          onChangeText = {(text) => this.setState({ email: text })}
        />

        <PasswordInput
          value        = {this.state.password}
          onChangeText = {(text) => this.setState({ password: text })}
        />

        <Button
          color   = "#841584"
          title   = "Inscription"
          onPress = {() => this.onSignUpPressed()}
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

