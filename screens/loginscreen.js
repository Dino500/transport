import React from 'react';
import { ImageBackground, StyleSheet, View  } from 'react-native';


import AppButton from '../components/Button';
function Loginscreen(props) {
    return (
            <ImageBackground source={require("../assets/splash.png")} style={styles.background} blurRadius={10}>
        <View style={styles.view}>
            <AppButton title="uloguj se"  onpress={ ()=> props.navigation.navigate('Prijava') }></AppButton>
            <AppButton title="registriraj se "  color="tipkana" onpress={ ()=> props.navigation.navigate('Registracija') }></AppButton>
        </View>

            </ImageBackground>
    );
}
const styles = StyleSheet.create({
    view :{
        width:'100%',
        marginBottom:'20%',
       alignItems:"center"
      
    },
    background:{
        flex:1,
        justifyContent:"flex-end"

    }
    
})

export default Loginscreen;