import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/AppText";
import AppButton from "../components/Button";
import colors from "../components/colors/colors";
import Korisnik from "../components/Korisnik";
import * as firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";

function Proizvod({ route, navigation }) {
  const [user, setUser] = useState();

  const getuser = async () => {
    const currentUser = await firebase.default
      .firestore()
      .collection("users")
      .doc(listing.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log(documentSnapshot.data());
          setUser(documentSnapshot.data());
        }
      });
  };
  const naviagtion = useNavigation();

  naviagtion.setOptions({ presentation: "modal", headerShown: false });

  useEffect(() => {
    getuser();
  }, []);

  const pozovi = () => {
    Linking.openURL("tel: 0603305543");
    console.log("pozvao");
  };

  const listing = route.params;
  return (
    <View style={styles.card}>
      <Image source={{ uri: listing.img }} style={styles.image}></Image>

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
              {listing.startCity}-{listing.endCity}
            </Text>
            <AppButton
              title={"Kontaktiraj"}
              color="tipkana"
              styleb="50%"
              onpress={pozovi}
            ></AppButton>
          </View>
          <Korisnik
            slika={user ? user.slikaurl : ""}
            tekst1={user ? user.name : "loadin"}
            tekst2=" 50 objava"
            onPress={() => navigation.navigate("Korisnik2")}
          ></Korisnik>
          <Text style={styles.font2}>{listing.startDate}</Text>
          <Text style={{ marginTop: 40 }}>Detalji:</Text>
          <View style={styles.detalji}>
            <Text style={{ margin: 20 }}>{listing.description}</Text>
          </View>
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
    flexDirection: "column",
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
