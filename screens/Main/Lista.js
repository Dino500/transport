import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import AppCard from '../../components//AppCard';


const listings = [
{
    id: 1 ,
    tekst1: "Sarajevo - Mostar", 
    tekst2: "300KM",
    tekst3: "25.10.2019",
    slika: require("../../assets/splash.png"),
},
{
    id: 2 ,
    tekst1: "Sarajevo - Mostar", 
    tekst2: "300KM",
    tekst3: "25.10.2019",
    slika: require("../../assets/icon.png"),
},
{
    id: 3 ,
    tekst1: "Sarajevo - Mostar", 
    tekst2: "300KM",
    tekst3: "25.10.2019",
    slika: require("../../assets/splash.png"),
},
{
    id: 4 ,
    tekst1: "Sarajevo - Mostar", 
    tekst2: "300KM",
    tekst3: "25.10.2019",
    slika: require("../../assets/splash.png"),
},
{
    id: 5 ,
    tekst1: "Sarajevo - Mostar", 
    tekst2: "300KM",
    tekst3: "25.10.2019",
    slika: require("../../assets/splash.png"),
},
{
    id: 6 ,
    tekst1: "Sarajevo - Mostar", 
    tekst2: "300KM",
    tekst3: "25.10.2019",
    slika: require("../../assets/splash.png"),
},
{
    id: 7 ,
    tekst1: "Sarajevo - Mostar", 
    tekst2: "300KM",
    tekst3: "25.10.2019",
    slika: require("../../assets/splash.png"),
}


] 

function Lista(props) {
    return (
        <SafeAreaView style={styles.ime}>
            <FlatList data={listings}
            keyExtractor={listing => listing.id.toString()} 
            renderItem={({item})=> <AppCard
            tekst1={item.tekst1}
            tekst2={item.tekst2}
            tekst3={item.tekst3}
            slika={item.slika}
            />}
            showsVerticalScrollIndicator="false"
            >


            </FlatList>


        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    ime:{
        
        flex:1,
        shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

elevation: 5,
    }
});
export default Lista;