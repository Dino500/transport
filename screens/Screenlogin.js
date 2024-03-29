import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppTextInput from "../components/AppTextInput.js";
import AppButton from "../components/Button";
import AppText from "../components/AppText";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import colors from "../components/colors/colors";
const validation = Yup.object().shape({
  email: Yup.string().email().required("Obavezno polje Email").label("Email"),
  password: Yup.string()
    .required("Obavezno polje Šifra")
    .min(8)
    .label("Password"),
});
const handleSubmit = async (lisnigs) => {
  const result = await signInWithEmailAndPassword(
    auth,
    lisnigs.email,
    lisnigs.password
  )
    .then((result) => {
      if (!result.user) {
        alert("Uspjesno");
      }
    })
    .catch((error) => alert(error));
};

function Screenlogin(props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-150}
    >
      <View style={styles.va}>
        <View style={styles.va1}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validation}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
                <AppText style={{ paddingTop: 10 }}>Email</AppText>
                <AppTextInput
                  icon="person"
                  placeholder="primjer@email.com"
                  autoCompleteType="password"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("email")}
                  height1={50}
                />
                <AppText style={{ color: colors.tipkana }}>
                  {errors.email}
                </AppText>
                <AppText style={{ paddingTop: 10 }}>Šifra</AppText>
                <AppTextInput
                  icon="key"
                  autoCorrect={false}
                  secureTextEntry
                  placeholder="******"
                  onChangeText={handleChange("password")}
                  height1={50}
                />
                <AppText style={{ color: colors.tipkana }}>
                  {errors.password}
                </AppText>
                <AppButton
                  title="Prijavi se"
                  style={styles.kut}
                  onpress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  va: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  va1: {
    width: "95%",
  },
  text: {
    height: "150px",
  },
});
export default Screenlogin;
