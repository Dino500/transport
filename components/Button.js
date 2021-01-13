import React from 'react';
import {View,StyleSheet,Text, TouchableOpacity } from 'react-native';
import colors from './colors/colors';
function AppButton({title, onpress, color="primary",styleb="100%",}) {
    return (
        

    <TouchableOpacity style={[styles.Button,{backgroundColor: colors[color]},{width: styleb}]} onPress={onpress} >
        <Text style={styles.Text}>{title}</Text>

    </TouchableOpacity>
        
    );
}
const styles = StyleSheet.create({
    Button:{
        marginTop:10,
        backgroundColor: colors.primary,
        alignItems:"center",
        width:'100%',
        margin:0,
        padding:15,
        justifyContent:"center",
    
    },
    Text:{
        textTransform:'uppercase',
        fontSize:15,
        fontWeight:'bold',
        color:"white"

    }
})

export default AppButton;