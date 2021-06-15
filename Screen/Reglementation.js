import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import Button from "../Components/Button";
import Title from "../Components/Title";
import { _goToURL } from "../core/utils";


export default class Reglementation extends React.Component {
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container} >
                <StatusBar style="auto" />
                <ScrollView style={styles.scrollView}>
                <Title title="Règlementation" />
                <Text style={styles.bold_title}>L'usage des cartes de stationnement et des places réservées </Text>
                <Text style={styles.paragraphe}>Les cartes de stationnement (Carte européenne de stationnement ou CMI stationnement) sont liées à la personne et non au véhicule. Elles servent à faciliter les déplacements des titulaires d'une de ces cartes.
                    En conséquence, elles peuvent être apposées dans n’importe quel véhicule dont le conducteur ou le passager est le titulaire de la carte de stationnement. La CMI comportant la mention "stationnement pour personnes handicapées" doit être apposée en évidence à l'intérieur du véhicule et fixée contre le pare-brise (afin de permettre la lecture du code barre).
                    À l’inverse, elles doivent être immédiatement retirées lorsque la personne handicapée ou à mobilité réduite n’utilise plus le véhicule (article R 241-20 du code de l’action sociale et des familles).
                    Par exemple, elle ne peut pas être utilisée par le petit-fils qui réalise des courses pour le compte de sa grand-mère handicapée lorsqu’il ne véhicule pas sa parente.</Text>
                <Text style={{ fontWeight: 'bold' }}>L'usage indu de la carte de stationnement</Text>
                </ScrollView>
                <TouchableOpacity onPress={() => _goToURL('https://www.ecologie.gouv.fr/laccessibilite-du-stationnement-et-carte-mobilite-inclusion-cmi')}>
                    <Text color="#ff5c5c">Lien officiel</Text>
                </TouchableOpacity>

                <Button
                    color="#841584"
                    title="Accueil"
                    onPress={() => navigate("HomePage")}
                />


            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    innerText: {
        color: "#841584",
        fontWeight: "bold",
    },
    bold_title:{
        fontWeight:"bold",
        fontSize: 22,
        textAlign: "center"
    },
    paragraphe:{        
        fontSize: 20,
        textAlign: "justify"
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 5,
      },
});