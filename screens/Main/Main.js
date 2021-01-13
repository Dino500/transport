import React from 'react';
import { View, Text,StyleSheet } from 'react-native'
import AppTextimput from '../../components/AppTextimput';
import Lista  from "./Lista";
function Main(prop) {
    return (
        <View style={styles.ime}>
            <View style={styles.pretraga}>

            <AppTextimput icon="search" placeholder="pretraga" style={styles.app} ></AppTextimput>
            <Lista></Lista>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    ime:{
        
        flex:1,
        borderBottomColor:"white"
        

    },
    pretraga:{
        flex:1,
        marginLeft:10,
        marginRight:10,
        
    },
    app:{
      flex:1
    }
});
export default  Main;