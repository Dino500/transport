import React from "react";
import PropTypes from "prop-types";
import { concat } from "react-native-reanimated";
import { useState } from "react";
import ImageInput from "./ImageInput";
import ImageInputList from "./ImageInputList";
import { useNavigation } from "@react-navigation/native";

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
      images={images}
      onAddImage={handleAdd}
      onRemoveImage={handleRemove}
    ></ImageInputList>
  );
}

export default Imagelista;
