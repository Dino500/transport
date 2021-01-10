import React from 'react';
import { View ,StyleSheet,Image , Text} from 'react-native';
import AppText from '../components/AppText'; 
import AppButton from '../components/Button';
import colors from '../components/colors/colors';
import Korisnik from '../components/Korisnik';
function Proizvod({tekst1, tekst2,tekst3 = null , slika=null}) {
    return (
        <View style={styles.card}>

<Image source={slika} style={styles.image}></Image>
<View style={styles.tekst}>

<View style={styles.proi}>

           <Text style={styles.font}>{tekst1}</Text>
           
   <View style={styles.kupi}>
    <Text style={[styles.font1, {color:"green" },{paddingRight:20}]}>{tekst3}</Text>
    <AppButton title={"Kupi"} color="tipkana" styleb="50%"  ></AppButton>
    </View> 
    <Korisnik slika={require("../assets/icon.png")} tekst1="Dino Topuz " tekst2=" 50 objava" ></Korisnik>
    <Text style={styles.font}>{tekst2}</Text>
</View>
</View>
    
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: colors.podloga,

        
        height:"100%",
        alignItems:"center",
       
        overflow:"hidden"
        
    },
    
    
    image:{
        width: '100%',
        height: 320,
    },

    tekst:{ 
        paddingTop:10,
        width:"80%"

    }
    ,
proi:{

    
    
}
    ,
font:{
        fontFamily:"Lato",
fontSize:40,
fontWeight:"500",
        padding:1
    },

font1:{
        fontFamily:"Lato",
fontSize:40,
fontWeight:"500",
        
    },

    kupi:{ 
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"center" ,
        height: "30%",
        marginTop:30

    }
});
export default Proizvod;