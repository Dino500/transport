import React, { useEffect, useState } from "react";

import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "./colors/colors";

function AppTextInput({
  icon,
  icon2,
  klik,
  value,
  onChange,
  height1 = 37,
  placeholder,
  ...otherprops
}) {
  const [tipka, settipka] = useState(false);

  useEffect(() => {
    if (tipka) {
      klik();
    }
    settipka(false);
  }, [tipka]);

  return (
    <SafeAreaView style={styles.kako}>
      <View style={[styles.tekst, { height: height1 }]}>
        <Ionicons name={icon} size={32} color="darkgray" style={styles.icon} />
        <TextInput
          onChangeText={onChange}
          value={value}
          keyboardType="email-address"
          keyboardAppearance="dark"
          placeholder={placeholder}
          placeholderTextColor={"darkgray"}
          onFocus={() => {
            {
              backgroundColor: "red";
            }
          }}
          style={[styles.tek, { height: height1 }]}
          {...otherprops}
        ></TextInput>
        <Ionicons
          name={icon2}
          size={32}
          color="darkgray"
          style={styles.icon}
          onPress={() => settipka(true)}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  tekst: {
    borderRadius: 20,
    backgroundColor: colors.podloga,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    overflow: "hidden",
  },
  icon: {
    margin: 10,
  },
  kako: {
    backgroundColor: "rgba(82, 22, 80, 0.0)",
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tek: {
    flex: 1,
    fontSize: 18,

    height: "100%",
    paddingLeft: 10,
    color: colors.tamno,
  },
});
export default AppTextInput;
