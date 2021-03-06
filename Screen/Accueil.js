import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image, Dimensions} from "react-native";
import Button from "../Components/Button";
import Title from "../Components/Title";
import * as SQLite from 'expo-sqlite'

export default class Accueil extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    const db           = SQLite.openDatabase("database.db");

    db.transaction (tx => {
      tx.executeSql("create table if not exists user (id integer primary key not null, name text, mail text, mdp text);")
      tx.executeSql("create table if not exists emplacements (id integer primary key not null, num integer, rue text, ville text, nb_place integre, type_stat text, comment text, photo text);")
    });

    db.transaction (
      tx => {
        tx.executeSql("SELECT * FROM user", [], (_, { rows }) =>
        // data = _array
        console.log(rows)
        
        );
      }
    );


    return (
      <View style={styles.container}>
        
        <Title title = "Connexion/Inscription" />

        <StatusBar style = "auto" />

        {/* <TouchableOpacity onPress={() => navigate("LoginScreen")}>
          <Text color = "#ff5c5c">Connexion</Text>
        </TouchableOpacity> */}

        <Button
          color   = "#841584"
          title   = "Connexion"
          onPress = {() => navigate("LoginScreen")}
        />

        <Button
          color   = "#ff5c5c"
          title   = "Inscription"
          onPress = {() => navigate("Registerscreen")}
        />

      <Button
          color   = "#ff5c5c"
          title   = "Autour de moi"
          onPress = {() => navigate("Map")}
        />

        <View style = {styles.Container}>
                <Image style={{width: Dimensions.get('window').width, resizeMode: 'contain'}}  source={require("../assets/Handicap.jpg")}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems     : "center",
    justifyContent : "center",
    
  },
});
