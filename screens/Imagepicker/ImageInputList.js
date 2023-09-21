import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "../../components/AppText";
import ImageInput from "./ImageInput";
import AppTextimput from "../../components/AppTextimput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as firebase from "firebase/app";
import "firebase/storage";

import Button from "../../components/Button";
import db from "../../firebase";

function ImageInputList({ images, onRemoveImage, onAddImage }) {
  const scrollView = useRef();
  const storage = firebase.default.storage();
  const storageRef = storage.ref();
  const [date, setDate] = useState("");
  const [endCity, setEndCity] = useState("");
  const [startCity, setStartCity] = useState("");
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Function to upload an image
  const uploadImage = async (localImagePath) => {
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

  const addDataToFirestore = async () => {
    try {
      const collectionRef = db.collection("objava");
      const downloadURL = await uploadImage(images[0]);
      // Data to be added
      const newData = {
        endCity: endCity,
        startCity: startCity,
        startDate: date,
        img: downloadURL,
        price: price,
        description: description,
        userId: firebase.default.auth().currentUser.uid,
      };

      // Add the data to the collection
      const docRef = await collectionRef.add(newData);

      console.log("Document added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // Call the function to add data

  return (
    <KeyboardAwareScrollView
      style={{ paddingHorizontal: 15 }}
      extraHeight={300}
    >
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {images.map((uri) => (
            <View key={1} style={styles.image}>
              <ImageInput
                images={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
      <AppText style={{ paddingTop: 20 }}>Polazni grad</AppText>
      <AppTextimput value={startCity} onChange={(text) => setStartCity(text)} />
      <AppText style={{ paddingTop: 20 }}>Dolazni grad</AppText>
      <AppTextimput value={endCity} onChange={(text) => setEndCity(text)} />
      <AppText style={{ paddingTop: 10 }}>Cijena</AppText>
      <AppTextimput value={price} onChange={(text) => setPrice(text)} />
      <AppText style={{ paddingTop: 10 }}>Datum Polaska</AppText>
      <AppTextimput value={date} onChange={(text) => setDate(text)} />
      <AppText style={{ paddingTop: 10 }}>Detalji objave</AppText>
      <AppTextimput
        value={description}
        onChange={(text) => setDescription(text)}
        height1={100}
      ></AppTextimput>
      <Button onpress={addDataToFirestore} title={"Potvrdi"}></Button>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
