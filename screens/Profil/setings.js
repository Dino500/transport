import React, { useEffect, useState } from 'react'
import { View,Image,Alert,Platform } from "react-native";
import AppTextimput from "../../components/AppTextimput";
import AppText from "../../components/AppText";
import Buttons from '../../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch,
    Text,
    Button,
    
  } from "react-native-paper";
  import { Ionicons } from "@expo/vector-icons";
import { backgroundColor, borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import * as ImagePicker from "expo-image-picker";
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import firebase from 'firebase';

import {} from 'firebase/storage'
import FilterModal from '../Main/FilterModal';

import colors from '../../components/colors/colors'


const Setings = () =>  {
    const [image, setImage] = useState(null);
    const [userdata , setuserdata] = useState();
    const [uploading, setuploading] = useState(false);
    const [urlslike , seturlslike] =useState("");

    const getuser = async() =>{

       const currentUser = await firebase.default.firestore().collection('users').doc(firebase.default.auth().currentUser.uid).get().then((documentSnapshot) => {
           if (documentSnapshot.exists) {
               console.log(documentSnapshot.data())
               setuserdata(documentSnapshot.data())
           }
       })

    }

    useEffect(() => {
      requestPermission();
      getuser();
      
    }, []);
  
    const requestPermission = async () => {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) alert("You need to enable permission to access the library.");
    };
  
    const handlePress = () => {
      if (!image) selectImage();
      else
       Alert.alert("Delete", "Are you sure you want to delete this image?", [
          { text: "Yes", onPress: () => setImage(null) },
          { text: "No" },
       ]);
       
        
    };
  

    useEffect(()=>{
      console.log(image)

    },[image])
    

    const selectImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
        });
        if (!result.cancelled) { 
          setImage({uri: result.uri});
        }
    
        
        else{console.log("izasao")}
      } catch (error) {
        console.log("Error reading an image", error);
      }
      
    };


     const Upload = async() => {
      const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =  uri.replace('file://', '') ;


        
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uploadUri, true);
        xhr.send(null);
      });
  
  
        const ref = firebase.storage().ref().child(filename)

        const snapshot = ref.put(blob)


        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,()=>{
          setuploading(true)

        }
        ,(error)=>{
          setuploading(false)
          console.log(error)
          blob.close();
          return
        },
        ()=>{
          snapshot.snapshot.ref.getDownloadURL().then((url)=>{
            setuploading(false)
            console.log(url)
            blob.close();
            setuserdata({...userdata, nesto: url})
            
            return url;
          })
        }
        );
  
      
     
     }
        
 
    return(
        <SafeAreaView style={{   marginHorizontal:20}}>
            <View>
              <View style={{flexDirection:"row"}}>

            <TouchableWithoutFeedback onPress={handlePress} >
            <Avatar.Image
                  source={ userdata ? userdata.nesto : require("../../assets/icon.png") }
                  size={100}
                  >
                </Avatar.Image>
                
                <View style={{borderRadius:100 ,marginTop:20,marginLeft:20 ,overflow:"hidden",position:"absolute"}}>

                    <Ionicons name='camera-outline'  size={50} style={{ opacity:0.7 ,padding:5, backgroundColor:"gray" ,  }} color="white" ></Ionicons>
                </View>
                </TouchableWithoutFeedback>
                <View>  
                <Title style={{paddingTop:20, paddingLeft:20}}>{userdata ? userdata.name : ""}</Title>
                <Caption style={{ paddingLeft:20}}>{userdata ? userdata.email : ""}</Caption>
                </View>
                </View>
                </View>
                <AppText style={{paddingTop: 10  }} maxLength={10} keyboardType='numeric'>Ime prezime</AppText >
<AppTextimput 
value={userdata ? userdata.name : ""}
onChangeText={(txt)=>setuserdata({...userdata,name: txt})}
>
  
</AppTextimput>
                    

            <AppText style={{paddingTop: 10  }} maxLength={10} keyboardType='numeric'>Broj telefona</AppText >
<AppTextimput 
value={userdata ? userdata.broj_telefona : ""}
onChangeText={(txt)=>setuserdata({...userdata,broj_telefona: txt})}
>
  
</AppTextimput>
<AppText style={{paddingTop: 10  }}>Nadimak</AppText >
<AppTextimput 
value={userdata ? userdata.ime : ""}
onChangeText={(txt)=>setuserdata({...userdata,ime: txt})}
>

  <TextInput ></TextInput>
</AppTextimput>
<AppText style={{paddingTop: 10  }}>Lokacija</AppText >
<AppTextimput 
value={userdata ? userdata.lokacija : ""}
onChangeText={(txt)=>setuserdata({...userdata,lokacija: txt})}
>
</AppTextimput>

<Buttons title={"Sačuvaj"} color={"tipkana"}> </Buttons>
</SafeAreaView>



 )   
}

export default Setings; 