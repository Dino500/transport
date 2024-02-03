import React, { Children } from "react";
import { Text, StyleSheet, Platform } from "react-native";

function AppText({ children, ...oderprops }) {
  return (
    <Text style={styles.text} {...oderprops}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontFamily: "Avenir",
      },
      android: {
        fontSize: 18,
        fontFamily: "Roboto",
      },
    }),
  },
});

export default AppText;
