import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "../../components/AppText";
import ImageInput from "./ImageInput";
import AppTextimput from "../../components/AppTextimput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Button from "../../components/Button";
import { app, auth, db } from "../../firebase";

import { Firestore, Timestamp, addDoc, collection } from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "react-native-ui-datepicker";
import colors from "../../components/colors/colors";

function ImageInputList({ images, onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  const storageRef = null;
  const [dates, setDates] = useState(new Date());
  const [endCity, setEndCity] = useState("");
  const [startCity, setStartCity] = useState("");
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigation = useNavigation();
  // Function to upload an image

  const uploadImage = async (localImagePath) => {
    console.log(dates);
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

  const addDataToFirestore = async () => {
    console.log(dates);
    try {
      const collectionRef = collection(db, "objava");
      const downloadURL = await uploadImage(images[0]);
      // Data to be added
      const newData = {
        endCity: endCity,
        startCity: startCity,
        startDate: dates,
        img: downloadURL,
        price: price,
        description: description,
        userId: auth.currentUser.uid,
      };

      // Add the data to the collection
      const docRef = await addDoc(collectionRef, newData);

      console.log("Document added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding data:", error);
    }

    navigation.navigate("Glavni");
  };

  const onDateChange = (params) => {
    let newdate = new Date(params.date);
    newdate.setUTCHours(0, 0, 0, 0);
    newdate.setUTCDate(newdate.getUTCDate() + 1);

    // setDates(newdate.setHours(selectedDate.getHours() + 1));
    console.log(newdate);
    setDates(newdate);
  };

  // Call the function to add data

  return (
    <KeyboardAwareScrollView
      style={{ paddingHorizontal: 15, marginBottom: 50 }}
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
      <AppTextimput
        value={price}
        onChange={(text) => setPrice(text)}
        keyboardType="decimal-pad"
      />
      <AppText style={{ paddingTop: 10 }}>Datum Polaska</AppText>

      <DateTimePicker
        onChange={(params) => onDateChange(params)}
        date={dates}
        selectedItemColor={colors.tipkana}
      />

      <AppText style={{ paddingTop: 10 }}>Detalji objave</AppText>
      <AppTextimput
        value={description}
        onChange={(text) => setDescription(text)}
        height1={100}
      ></AppTextimput>
      <Button onpress={addDataToFirestore} title={"Potvrdi"}></Button>

      <></>
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
