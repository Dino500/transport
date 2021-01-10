import React from 'react';
import { Button, View ,StyleSheet} from 'react-native';
import AppTextimput from '../components/AppTextimput';
import AppButton from '../components/Button';

function Screenregistracija(props) {
    return (
        <View style={styles.va}>
 <View style={styles.va1}>

        <AppTextimput icon="mail" tekst="Mail" style={styles.kut}/>
        <AppTextimput icon="person" tekst="Korisnicko ime i prezime"style={styles.kut}/>
        <AppTextimput icon="key" tekst="Lozinka"style={styles.kut}/>
        <AppButton title="Uloguj se" style={styles.kut} />
 </View>
        </View>

    );
}
const styles = StyleSheet.create({
    va:{
        
        height:"100%", 
        flexDirection:"column",
        justifyContent:"center",
       alignItems:"center"
       
    },
    va1:{
       
       marginBottom:"10%",
        width:"95%"
    },
    kut:{
        marginTop:20
    }
});
export default Screenregistracija;