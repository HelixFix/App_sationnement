import React from "react";
import Title from "../Components/Title";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import Button from "../Components/Button";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import { emailValidator, passwordValidator } from "../core/utils";


export default class MotDePasseOublie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email   : "",
      password: "",
    };
  }

  alerte() {
    Alert.alert("Erreur", "Veuillez remplir correctement les champs", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }

  onPWChangePressed() {
    console.log("click");
    //console.log(this.props);

    const emailError    = emailValidator(this.state.email);
    const passwordError = passwordValidator(this.state.password);
    //var user = [];

    if (emailError || passwordError) {
      this.alerte();
      return;
    }

    const { users } = this.props;

    var userConnect = false;

    // if (users.length == 0) {
    //   Alert.alert(
    //     "Erreur",
    //     "Database vide",
    //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    //     { cancelable: false }
    //   );
    // }

    for (var i = 0; i < users.length; i++) {
      if (users[i].email == this.state.email) {

        userConnect = true;

        const action      = {
          type : "ADD_USER",
          value: {
            name    : users[i].name,
            email   : this.state.email,
            password: this.state.password,
          },
        };

        this.props.dispatch(action);

        this.props.navigation.navigate("LoginScreen");
      }
    }

    if (userConnect == false) {
      Alert.alert(
        "Erreur",
        "L'email est incorrect",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
  }
  }

  render() {
    //const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Title title = "Nouveau mot de passe" />

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
          title   = "Modifier"
          onPress = {() => this.onPWChangePressed()}
        />
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

