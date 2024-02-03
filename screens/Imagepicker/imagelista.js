import React from "react";
import PropTypes from "prop-types";

import { useState } from "react";
import ImageInput from "./ImageInput";
import ImageInputList from "./ImageInputList";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

function Imagelista(props) {
  const [images, setImages] = useState([]);

  const navigation = useNavigation();
  navigation.setOptions({ title: "Dodaj", headerShown: true });

  const handleAdd = (uri) => {
    setImages([...images, uri]);
  };
  const handleRemove = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };
  return (
    <ImageInputList
      style={styles.image}
      images={images}
      onAddImage={handleAdd}
      onRemoveImage={handleRemove}
    ></ImageInputList>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    paddingBottom: "1000",
  },
});

export default Imagelista;
