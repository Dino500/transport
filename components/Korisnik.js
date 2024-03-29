import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
function Korisnik({ tekst1, tekst2, slika, onPress }) {
  const navigation = useNavigation();
  navigation.setOptions({ title: "Postavke", headerShown: true });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={slika ? { uri: slika } : null}
          style={styles.slika}
        ></Image>
        <View style={styles.tekst}>
          <Text style={styles.font1}>{tekst1}</Text>

          <Text style={styles.font}>{tekst2}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 40,
    backgroundColor: "#fcfcfc",
  },
  slika: {
    width: 72,
    height: 72,
    borderRadius: 100,
    marginRight: 30,
  },
  font1: {
    fontSize: 20,
    paddingBottom: 5,
  },
});
export default Korisnik;
