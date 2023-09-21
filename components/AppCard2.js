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
import { startClock } from "react-native-reanimated";
function AppCard2({
  startCity,
  endCity,
  tekst2,
  price = null,
  slika = null,
  onPress,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: slika }} style={styles.image}></Image>
        <View style={styles.tekst}>
          <Text style={styles.font}>
            {startCity}- {endCity}
          </Text>

          <Text style={styles.font}>{tekst2}</Text>
          <Text style={[styles.font, { paddingTop: 15 }]}>Cijena:</Text>
          <Text style={[styles.font, { color: "green" }]}>{price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.podloga,

    width: "45%",
    marginTop: "5%",

    marginHorizontal: 10,
    justifyContent: "center",
    borderRadius: 30,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 176,
    borderRadius: 30,
  },

  tekst: {
    padding: 10,
  },
  font: {
    fontSize: 18,
    fontWeight: "500",
    padding: 1,
  },
});
export default AppCard2;
