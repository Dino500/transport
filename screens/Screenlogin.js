import React from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppTextImput from "../components/AppTextimput";
import AppButton from "../components/Button";
import AppText from "../components/AppText";

import firebase from "firebase";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../components/colors/colors";
const validation = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});
const handleSubmit = async (lisnigs) => {
  const result = await firebase
    .auth()
    .signInWithEmailAndPassword(lisnigs.email, lisnigs.password)
    .then(alert("uspjeh"))
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
                <AppTextImput
                  icon="person"
                  placeholder="Ukucajte vas Email"
                  autoCompleteType="password"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("email")}
                />
                <AppText style={{ color: colors.tipkana }}>
                  {errors.email}
                </AppText>
                <AppTextImput
                  icon="key"
                  autoCorrect={false}
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                />
                <AppText style={{ color: colors.tipkana }}>
                  {errors.password}
                </AppText>
                <AppButton
                  title="Uloguj se"
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
});
export default Screenlogin;
