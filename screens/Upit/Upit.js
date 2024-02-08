import { View, Text } from "react-native";
import React, { useState } from "react";
import AppTextInput from "../../components/AppTextInput";
import AppText from "../../components/AppText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppButton from "../../components/Button";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const Upit = () => {
  const navigation = useNavigation();
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Uspješno poslan upit",
    });

    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      style={{ paddingHorizontal: 15, marginBottom: 50 }}
      extraHeight={300}
    >
      <AppText style={{ paddingTop: 20 }}>Ime i prezime</AppText>
      <AppTextInput />
      <AppText style={{ paddingTop: 20 }}>Adresa</AppText>
      <AppTextInput />
      <AppText style={{ paddingTop: 20 }}>Broj telfona</AppText>
      <AppTextInput keyboardType="phone-pad" />
      <AppText style={{ paddingTop: 10 }}>Opis tereta</AppText>
      <AppTextInput />
      <AppButton onpress={showToast} title={"Potvrdi"}></AppButton>
    </KeyboardAwareScrollView>
  );
};

export default Upit;
