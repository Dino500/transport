import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/AppText";
import AppButton from "../components/Button";
import colors from "../components/colors/colors";
import Korisnik from "../components/Korisnik";
import firestore, { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import Upit from "./Upit/Upit";

function Proizvod({ route, navigation }) {
  const [user, setUser] = useState();

  const getuser = async () => {
    try {
      const collectionRef = doc(db, "users", route.params.userId);

      const snapshot = await getDoc(collectionRef);

      const newData = { id: snapshot.id, ...snapshot.data() };

      console.log(newData);
      setUser(newData);
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  };
  const naviagtion = useNavigation();

  naviagtion.setOptions({ presentation: "modal", headerShown: false });

  useEffect(() => {
    getuser();
  }, []);

  const pozovi = () => {
    Linking.openURL("tel: 0603305543");
    console.log("pozvao");

    naviagtion.navigate("Upit");
  };

  const getDate = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);

    const dateObject = new Date(milliseconds);

    function formatDateToDDMMYYYY(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getUTCFullYear();

      return `${day}-${month}-${year}`;
    }

    return formatDateToDDMMYYYY(dateObject);
  };

  const listing = route.params;
  return (
    <View style={styles.card}>
      <ScrollView
        style={styles.tekst}
        bounces="true"
        showsVerticalScrollIndicator="false"
      >
        <Image source={{ uri: listing.img }} style={styles.image}></Image>

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
            onPress={() => navigation.navigate("Korisnik2", listing)}
          ></Korisnik>
          <Text style={{ marginTop: 40 }}>Datum polaska:</Text>
          <Text style={styles.font2}>{getDate(listing.startDate)}</Text>
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
