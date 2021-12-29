import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppTextimput from "../components/AppTextimput";
import AppButton from "../components/Button";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import AppText from "../components/AppText";

import * as firebase from "firebase/app";

import 'firebase/firestore';

import colors from "../components/colors/colors";

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Mora biti email")
    .required("Email se mora unjeti ")
    .label("Email"),
  name: Yup.string()
    .required("Ime i prezime se mora unjeti ")
    .min(6, "Mora biti minimum 6 karaktera"),
  password: Yup.string()
    .required("Lozinka se mora unjeti ")
    .min(8, "Mora biti minimum 8 karaktera")
    .label("Password"),
});

export class Screenregistracija extends Component {
  async spapi(prop) {
    await firebase.default
      .firestore()
      .collection("users")
      .doc(firebase.default.auth().currentUser.uid)
      .set({ email: prop.email, name: prop.name });
  }
  async sungup(prop) {
    await firebase.default
      .auth()
      .createUserWithEmailAndPassword(prop.email, prop.password)
      .then((result) => {
        if (!result.user) {
          alert("Uspjesno");
        }
        this.spapi(prop);
        console.log(result);
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-80}
      >
        <View style={styles.va}>
          <View style={styles.va1}>
            <Formik
              initialValues={{ email: "", name: "", password: "" }}
              onSubmit={(this.sungup = this.sungup.bind(this))}
              validationSchema={validation}
            >
              {({ handleChange, handleSubmit, errors }) => (
                <>
                  <AppTextimput
                    icon="mail"
                    placeholder="Mail"
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    autoCorrect={false}
                  />
                  <AppText style={{ color: colors.tipkana }}>
                    {errors.email}
                  </AppText>
                  <AppTextimput
                    icon="person"
                    placeholder="Korisnicko ime i prezime"
                    onChangeText={handleChange("name")}
                    autoCapitalize="none"
                  />
                  <AppText style={{ color: colors.tipkana }}>
                    {errors.name}
                  </AppText>
                  <AppTextimput
                    icon="key"
                    placeholder="Lozinka"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                  />
                  <AppText style={{ color: colors.tipkana }}>
                    {errors.password}
                  </AppText>

                  <AppButton
                    title="Uloguj se"
                    onpress={handleSubmit}
                  ></AppButton>
                </>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  va: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  va1: {
    marginBottom: "0%",
    width: "95%",
  },
});
export default Screenregistracija;
