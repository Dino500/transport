import React, { useEffect, useState } from "react";
import { View, Image, Alert, Platform } from "react-native";
import AppTextimput from "../../components/AppTextimput";
import AppText from "../../components/AppText";
import Buttons from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
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

import * as ImagePicker from "expo-image-picker";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { getApp } from "firebase/app";
import firestore, { getDoc, doc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useNavigation } from "@react-navigation/native";

const Postavke = () => {
  const [image, setImage] = useState(null);
  const [userdata, setuserdata] = useState();
  const [uploading, setuploading] = useState(false);
  const [urlslike, seturlslike] = useState("");
  const naviagtion = useNavigation();
  naviagtion.setOptions({ title: "Postavke", headerShown: true });

  const getuser = async () => {
    try {
      const collectionRef = doc(db, "users", auth.currentUser.uid);

      const snapshot = await getDoc(collectionRef);

      const newData = { id: snapshot.id, ...snapshot.data() };

      console.log(newData);
      setuserdata(newData);
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  /* const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  }; */

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
      if (!result.canceled) {
        console.log(result);
        setImage(result.assets[0].uri);
        setuserdata({ ...userdata, slikaurl: result.assets[0].uri });
      } else {
        console.log("izasao");
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const Upload = async (localImagePath) => {
    try {
      const storage = getStorage(app);

      const imageRef = ref(storage, "images/" + new Date().getTime() + ".jpg");
      const response = await fetch(localImagePath);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const edithandle = async () => {
    const img = await Upload(image);
    const collectionRef = doc(db, "users", auth.currentUser.uid);

    await setDoc(collectionRef, {
      broj_telefona: userdata.broj_telefona,
      name: userdata.name,
      ime: userdata.ime,
      slikaurl: img,
      // Convert to integer if necessary
    });
  };

  return (
    <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Avatar.Image
              source={{ uri: userdata ? userdata.slikaurl : image }}
              size={100}
            ></Avatar.Image>

            <View
              style={{
                borderRadius: 100,
                marginTop: 20,
                marginLeft: 20,
                overflow: "hidden",
                position: "absolute",
              }}
            >
              <Ionicons
                name="camera-outline"
                size={50}
                style={{ opacity: 0.7, padding: 5, backgroundColor: "gray" }}
                color="white"
              ></Ionicons>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Title style={{ paddingTop: 20, paddingLeft: 20 }}>
              {userdata ? userdata.name : ""}
            </Title>
            <Caption style={{ paddingLeft: 20 }}>
              {userdata ? userdata.email : ""}
            </Caption>
          </View>
        </View>
      </View>
      <AppText style={{ paddingTop: 10 }} maxLength={10} keyboardType="numeric">
        Ime prezime
      </AppText>
      <AppTextimput
        value={userdata ? userdata.name : ""}
        onChangeText={(txt) => setuserdata({ ...userdata, name: txt })}
      ></AppTextimput>

      <AppText style={{ paddingTop: 10 }} maxLength={10} keyboardType="numeric">
        Broj telefona
      </AppText>
      <AppTextimput
        value={userdata ? userdata.broj_telefona : ""}
        onChangeText={(txt) => setuserdata({ ...userdata, broj_telefona: txt })}
      ></AppTextimput>
      <AppText style={{ paddingTop: 10 }}>Nadimak</AppText>
      <AppTextimput
        value={userdata ? userdata.ime : ""}
        onChangeText={(txt) => setuserdata({ ...userdata, ime: txt })}
      ></AppTextimput>
      <AppText style={{ paddingTop: 10 }}>Lokacija</AppText>
      <AppTextimput
        value={userdata ? userdata.lokacija : ""}
        onChangeText={(txt) => setuserdata({ ...userdata, lokacija: txt })}
      ></AppTextimput>

      <Buttons
        title={"Sačuvaj"}
        color={"tipkana"}
        onpress={edithandle}
      ></Buttons>
    </View>
  );
};

export default Postavke;
