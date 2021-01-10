import React from 'react';

import { TextInput, StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import { Ionicons , MaterialCommunityIcons} from '@expo/vector-icons';
import colors from './colors/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
function AppTextimput({icon , tekst}) {
    return (
        <SafeAreaView >
            
            <View style={styles.tekst}>

<Ionicons name={icon} size={32} color="darkgray" style={styles.icon}/>
        <TextInput 
        keyboardType="email-address"
        keyboardAppearance="dark"
        placeholder={tekst}
        style={styles.tek}
    
        >


        </TextInput>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    tekst:{
        borderRadius:20,
        backgroundColor: colors.podloga,
        alignItems:"center",
        flexDirection:"row",
        marginTop:10
        
    },
    icon:{
    margin:10

    },

    tek:{
        fontSize:18,
        paddingLeft:10,
        color:colors.tamno
    }
});
export default AppTextimput;