import React, { useEffect, useState } from 'react'
import { View,Image,Alert } from "react-native";
import AppTextimput from "../../components/AppTextimput";
import AppText from "../../components/AppText";
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
    
  } from "react-native-paper";
  import { Ionicons } from "@expo/vector-icons";
import { backgroundColor, borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import * as ImagePicker from "expo-image-picker";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import firebase from 'firebase/app'





function setings() {
    const [image, setImage] = useState();
    const [userdata , setuserdata] = useState(null);
    

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
  
    const selectImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
        });
        if (!result.cancelled) { setImage(result.uri)
        
        
        
        }
    
        
        else{console.log("izasao")}
      } catch (error) {
        console.log("Error reading an image", error);
      }
    };


    











 
 
    return(
        <SafeAreaView style={{   paddingHorizontal:20}}>
            <View>
            <TouchableWithoutFeedback onPress={handlePress}>
            <Image
                  source={{ uri: image }}
                  style={{width:100, height:100 , borderRadius: 100, borderWidth: 2 ,borderColor:"gray"}}
                  
                  
                  >
                </Image>

                <Ionicons name={"camera"} size={20} color="gray" style={{  position:"absolute" ,marginTop:75, marginLeft:75 , backgroundColor: "white", borderWidth:1 , borderRadius:12.5 ,borderColor:"gray" }}  ></Ionicons>
                </TouchableWithoutFeedback>
                    </View>

            <AppText style={{paddingTop: 10  }} maxLength={10} keyboardType='numeric'>Broj telefona</AppText >
<AppTextimput  >
  
</AppTextimput>
<AppText style={{paddingTop: 10  }}>Datum Polaska</AppText >
<AppTextimput  >
  
</AppTextimput>
<AppText style={{paddingTop: 10  }}>Datum Polaska</AppText >
<AppTextimput  >
  
</AppTextimput>

        </SafeAreaView>



 )   
}

export default setings; 