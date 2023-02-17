import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/AppText";
import AppButton from "../components/Button";
import colors from "../components/colors/colors";
import Korisnik from "../components/Korisnik";
function Proizvod({ route ,navigation}) {
  const listing = route.params;
  return (
    <View style={styles.card}>
      <Image source={listing.slika} style={styles.image}></Image>

      <ScrollView
        style={styles.tekst}
        bounces="true"
        showsVerticalScrollIndicator="false"
      >
        <View style={styles.proi}>
          <Text style={styles.font}>{listing.tekst1}</Text>

          <View style={styles.kupi}>
            <Text
              style={[styles.font1, { color: "green" }, { paddingRight: 20 }]}
            >
              {listing.tekst3}
            </Text>
            <AppButton
              title={"Kontaktiraj"}
              color="tipkana"
              styleb="50%"
            ></AppButton>
          </View>
          <Korisnik
            slika={require("../assets/icon.png")}
            tekst1="Korisnik 123  "
            tekst2=" 50 objava"
            onPress={() => navigation.navigate("Korisnik")}
          ></Korisnik>
          <Text style={styles.font2}>
            {listing.tekst2} {"     8:30"}{" "}
          </Text>
          <Text style={{ marginTop: 40 }}>Detalji:</Text>
          <View style={styles.detalji}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.podloga,

    height: "100%",
    alignItems: "center",

    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 320,
  },

  tekst: {
    paddingTop: 10,
    width: "80%",
    height: 500,
  },
  proi: {},
  font: {
    fontSize: 40,
    fontWeight: "500",
    paddingTop: 1,
  },
  font2: {
    paddingLeft: 10,
    fontSize: 30,
    marginTop: 10,
  },

  font1: {
    fontSize: 40,
    fontWeight: "500",
  },

  kupi: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 30,
  },
  detalji: {
    backgroundColor: "#f9f9f9",
    height: 300,
    borderRadius: 30,
    marginTop: 5,
  },
});
export default Proizvod;
