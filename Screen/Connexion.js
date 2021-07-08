import React from "react";
import Title from "../Components/Title";
import { Alert, StyleSheet,View, Text } from "react-native";
import Button from "../Components/Button";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import { emailValidator, passwordValidator } from "../core/utils";
import * as SQLite from 'expo-sqlite'

export default class Connexion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email   : "",
      password: "",
    };
  }

  


  // Méthode SQLite
   alerte() {
      Alert.alert("Erreur", "Veuillez remplir correctement les champs", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }

   onLoginPressed() {
      const emailError    = emailValidator(this.state.email);
      const passwordError = passwordValidator(this.state.password);
      const db            = SQLite.openDatabase("database.db");
  
      if (emailError || passwordError) {
        this.alerte();
      } else {
        return new Promise((resolver, reject) => {
            db.transaction((tx) => {
              tx.executeSql(
                "SELECT * FROM user WHERE mail = ? AND mdp = ?",
                [this.state.email, this.state.password],
                (tx, { rows }) => {
                  console.log(rows);
                  if (rows._array.length > 0) {
                    this.props.navigation.navigate("CreationEmplacement", { username: rows._array[0].name });
                  } else {
                    alert();
                  }
                },
                (tx, error) => {
                  console.log("erreur de traitement");
                }
              );
            });
          });
      }
      
  };



  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Title title = "Connexion" />

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
          title   = "Connexion"
          onPress = {() => this.onLoginPressed()}
        />

        <Button
          color   = "#ff5c5c"
          title   = "Inscription"
          onPress = {() => navigate("Registerscreen")}
        />

        <Text style = {styles.innerText} onPress = {() => navigate("ForgotPW")}>
          Mot de passe oublié ?
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

