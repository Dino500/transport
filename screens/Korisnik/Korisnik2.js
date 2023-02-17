import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import AppCard from '../../components/AppCard';
import {Avatar, Caption, Text, Title} from 'react-native-paper'

import AppCard2 from '../../components/AppCard2';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import AppButton from '../../components/Button';

function Korisnik({navigation,route}) {
  const linstin = route.params;
const[dataSource, setdataSource] =useState() ; 
const[dataBackup, setdataBackup] = useState(); 
const[leng , setleng] =useState()

    useEffect(()=> {
        var data = [
          {
            id: 1,
            user: "neko1",
            tekst1: "Zagreb - Mostar",
            tekst3: "900KM",
            tekst2: "10.1.2021",
            slika: require("../../assets/9.jpg"),
          },
          {
            id: 2,
            tekst1: "Sarajevo - Beograd",
            tekst3: "700KM",
            tekst2: "20.1.2021",
            slika: require("../../assets/8.jpg"),
          },
          {
            id: 3,
            tekst1: "Beograd - Banja Luka",
            tekst3: "600KM",
            tekst2: "3.2.2021",
            slika: require("../../assets/7.jpg"),
          },
          {
            id: 4,
            tekst1: "Sarajevo - Mostar",
            tekst3: "400KM",
            tekst2: "5.3.2021",
            slika: require("../../assets/6.jpg"),
          },
          {
            id: 5,
            user: "neko1",
            tekst1: "Sarajevo - Mostar",
            tekst3: "350KM",
            tekst2: "5.5.2021",
            slika: require("../../assets/5.jpg"),
          },
          {
            id: 6,
            tekst1: "Sarajevo - Mostar",
            tekst3: "450KM",
            tekst2: "10.5.2021",
            slika: require("../../assets/1.jpg"),
          },
          {
            id: 7,
            user: "neko1",
            tekst1: "Sarajevo - Mostar",
            tekst3: "500KM",
            tekst2: "8.7.2021",
            slika: require("../../assets/splash.png"),
          },
        ];
        setdataBackup(data)
        setdataSource(data);
        setleng( Object.keys(data).length);
        console.log(leng)
      },[]);




  return (
    <View>
       <FlatList
          data={dataSource}
          numColumns={2}
          keyExtractor={(listing) => listing.id.toString()}
          ListHeaderComponent={<View style={{padding:20, borderBottomWidth:1 , borderBottomColor:"lightgray" , alignItems:"center" ,alignContent:"center" ,alignSelf:"center"}}>
          <Avatar.Image source={require("../../assets/23.jpg")} size={100}></Avatar.Image>
          <View  style={{alignItems:"center", paddingTop:10}}>
  
          <Title>@korisnik</Title>
          <View style={{flexDirection:"row"}} >
          <View style={{alignItems:"center", paddingHorizontal:5}}>
          <Text style={{fontSize:20}}>{leng}</Text>
          <Text style={{fontSize:15}}>objava</Text>
          
          </View>
         <View style={{alignItems:"center", paddingHorizontal:5 , borderEndWidth: 1 , borderStartWidth:1 ,  paddingHorizontal:7 ,borderColor:"gray" }}>
         <Text style={{fontSize:20}}>{leng}</Text>
          <Text style={{fontSize:15}}>Zavrsenih</Text>

         </View>
         <View style={{alignItems:"center", paddingHorizontal:5}}>
         <Text style={{fontSize:20}}>3</Text>
          <Text style={{fontSize:15}}>dojmovi</Text>

         </View>
          </View>

          </View>
          <AppButton color='tipkana' title={"kontaktiraj"} style={{paddingTop:4}}></AppButton>
        </View>}
          renderItem={({ item }) => (



            
            <AppCard2
              tekst1={item.tekst1}
              tekst2={item.tekst2}
              tekst3={item.tekst3}
              slika={item.slika}
              onPress={() => navigation.navigate("listing", item)}
            />
          )}
          showsVerticalScrollIndicator="false"
        >
      

        </FlatList>
       
    </View>
  )
}




export default Korisnik