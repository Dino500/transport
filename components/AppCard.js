import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors/colors";
function AppCard({ tekst1, tekst2, tekst3 = null, slika = null, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image source={slika} style={styles.image}></Image>
        <View style={styles.tekst}>
          <Text style={styles.font}>Relacija:</Text>
          <Text style={styles.font}>{tekst1}</Text>
          <Text style={styles.font}>Datum:</Text>
          <Text style={styles.font}>{tekst2}</Text>
          <Text style={[styles.font, { paddingTop: 15 }]}>Cijena:</Text>
          <Text style={[styles.font, { color: "green" }]}>{tekst3}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.podloga,
    alignItems: "center",

    marginTop: 10,
    padding: 0,
    justifyContent: "center",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "flex-start",

    elevation: 5,
  },
  image: {
    position: "relative",
    overflow: "hidden",
    marginRight: 10,
    width: 184,
    height: 176,
    borderRadius: 30,
  },

  tekst: {
    paddingTop: 0,
  },
  font: {
    fontSize: 18,
    fontWeight: "500",
    padding: 1,
  },
});
export default AppCard;
