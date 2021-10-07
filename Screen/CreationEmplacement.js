import React from "react";
import Title from "../Components/Title";
import { StyleSheet, View, Text } from "react-native";
import Button from "../Components/Button";

export default class CreationEmplacement extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Title title = "Vous êtes connecté" />
        

        <Text style = {{ width: "60%", textAlign: "center" }}>
          Bienvenu {this.props.route.params.username} sur notre application dédiée au stationnement handicapé
          {"\n"}
        </Text>

        <Button
          color   = "#ff5c5c"
          title   = "Déclarer emplacement"
          onPress = {() => navigate("Photo")}
        />

        <Button
          color   = "#ff5c5c"
          title   = "RGPD"
          onPress = {() => navigate("RGPD")}
        />

        <Button
          color   = "#ff5c5c"
          title   = "Réglementation"
          onPress = {() => navigate("Reglementation")}
        />

        <Button
          color   = "#841584"
          title   = "Déconnexion"
          onPress = {() => navigate("Accueil")}
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
});
