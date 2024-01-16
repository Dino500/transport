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
import {
  backgroundColor,
  borderColor,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import * as ImagePicker from "expo-image-picker";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import firebase from "firebase";

import {} from "firebase/storage";
import FilterModal from "../Main/FilterModal";

import colors from "../../components/colors/colors";
import { useNavigation } from "@react-navigation/native";

const Postavke = () => {
  const storage = firebase.default.storage();
  const storageRef = storage.ref();
  const [image, setImage] = useState(null);
  const [userdata, setuserdata] = useState();
  const [uploading, setuploading] = useState(false);
  const [urlslike, seturlslike] = useState("");

  const naviagtion = useNavigation();

  naviagtion.setOptions({ title: "Postavke", headerShown: true });

  const getuser = async () => {
    const currentUser = await firebase.default
      .firestore()
      .collection("users")
      .doc(firebase.default.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log(documentSnapshot.data());
          setuserdata(documentSnapshot.data());
        }
      });
  };

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

  useEffect(() => {
    console.log(image);
  }, [image]);

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
      const imageRef = storageRef.child(
        "images/" + new Date().getTime() + ".jpg"
      );
      const response = await fetch(localImagePath);
      const blob = await response.blob();
      await imageRef.put(blob);
      const downloadURL = await imageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const edithandle = async () => {
    const img = await Upload(image);
    const collectionRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.default.auth().currentUser.uid);

    collectionRef.update({
      broj_telefona: userdata.broj_telefona,
      name: userdata.name,
      ime: userdata.ime,
      slikaurl: img,
      // Convert to integer if necessary
    });
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
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
      >
        <TextInput></TextInput>
      </AppTextimput>
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
    </SafeAreaView>
  );
};

export default Postavke;
