import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import AppText from "../../components/AppText";
import ImageInput from "./ImageInput";
import AppTextInput from "../../components/AppTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Buttons from "../../components/Button";
import { app, auth, db } from "../../firebase";

import { Firestore, Timestamp, addDoc, collection } from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "react-native-ui-datepicker";
import colors from "../../components/colors/colors";
import { Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

function ImageInputList({ images, onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  const storageRef = null;
  const [dates, setDates] = useState();
  const [endCity, setEndCity] = useState();
  const [startCity, setStartCity] = useState("");
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
      Toast.show({
        type: "success",
        text1: "Uspješno poslan upit",
      });

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

  function formatDateToDDMMYYYY(inputDate) {
    if (inputDate == null) {
      return "";
    }
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  // Call the function to add data

  const onClose = () => {
    setIsVisible(false);
  };

  const onOpen = () => {
    setIsVisible(true);
  };

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
      <AppTextInput value={startCity} onChange={(text) => setStartCity(text)} />
      <AppText style={{ paddingTop: 20 }}>Dolazni grad</AppText>
      <AppTextInput value={endCity} onChange={(text) => setEndCity(text)} />
      <AppText style={{ paddingTop: 10 }}>Cijena</AppText>
      <AppTextInput
        value={price}
        onChange={(text) => setPrice(text)}
        keyboardType="decimal-pad"
        placeholder=""
      />
      <AppText style={{ paddingTop: 10 }}>Datum polaska</AppText>

      <AppTextInput
        onPressIn={onOpen}
        icon2={"calendar-outline"}
        height1={50}
        value={formatDateToDDMMYYYY(dates)}
        editable={false}
        selectTextOnFocus={false}
        placeholder={"Dodaj datum"}
        klik={() => {}}
      ></AppTextInput>

      <Modal transparent animationType="fade" visible={isVisible}>
        <SafeAreaView
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          onStartShouldSetResponder={onClose}
        >
          <View style={styles.modal}>
            <View>
              <AppText style={{ margin: 10 }}>Datum Polaska</AppText>
              <DateTimePicker
                onChange={(params) => onDateChange(params)}
                date={dates}
                selectedItemColor={colors.tipkana}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: 10,
                }}
              >
                <Button
                  title="Sačuvaj"
                  mode="contained"
                  onPress={onClose}
                  color={colors.tipkana}
                  style={{ marginRight: 10 }}
                >
                  Sačuvaj
                </Button>
                <Button
                  title="Zatvori"
                  mode="outlined"
                  onPress={onClose}
                  color={colors.tanmacrna}
                >
                  Zatvori
                </Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <AppText style={{ paddingTop: 10 }}>Detalji objave</AppText>
      <AppTextInput
        value={description}
        onChange={(text) => setDescription(text)}
        height1={100}
      ></AppTextInput>
      <Buttons onpress={addDataToFirestore} title={"Potvrdi"}></Buttons>

      <></>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  modal: {
    marginBottom: 200,
    width: 330,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    /* shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 50,

    elevation: 2, */
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
