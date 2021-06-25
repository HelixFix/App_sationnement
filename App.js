import React from "react";
import Accueil from "./Screen/Accueil.js";
import Connexion from "./Screen/Connexion";
import Map from "./Screen/Map.js";
import MotDePasseOublie from "./Screen/MotDePasseOublie"
import Inscription from "./Screen/Inscription";
import CreationEmplacement from "./Screen/CreationEmplacement";
import Reglementation from "./Screen/Reglementation";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const App = () => {
  return (
 
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name = "Map" component                 = {Map} />
        <Stack.Screen name = "Accueil" component             = {Accueil} />
        <Stack.Screen name = "LoginScreen" component         = {Connexion} />
        <Stack.Screen name = "ForgotPW" component            = {MotDePasseOublie} />
        <Stack.Screen name = "CreationEmplacement" component = {CreationEmplacement} />
        <Stack.Screen name = "Reglementation" component      = {Reglementation} />
        <Stack.Screen name = "Registerscreen" component      = {Inscription} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
