import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AppCard from "../../components/AppCard";
import { Avatar, Caption, Text, Title } from "react-native-paper";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";

import AppCard2 from "../../components/AppCard2";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import AppButton from "../../components/Button";
import * as firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";

function Korisnik({ navigation, route }) {
  const linstin = route.params;
  const [dataSource, setdataSource] = useState();
  const [dataBackup, setdataBackup] = useState();
  const [leng, setleng] = useState();
  const [user, setUser] = useState();

  const naviagtion = useNavigation();
  navigation.setOptions({ title: "Profil", headerShown: true });

  const getuser = async () => {
    const currentUser = await firebase.default
      .firestore()
      .collection("users")
      .doc(firebase.default.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log(documentSnapshot.data());
          setUser(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    /*  var data = [
          {
            id: 1,
            user: "neko1",
            tekst1: "Zagreb - Mostar",
            tekst3: "900KM",
            tekst2: "10.1.2021",
            slika: require("../../assets/9.jpg"),
          },
          {
            id: 2,
            tekst1: "Sarajevo - Beograd",
            tekst3: "700KM",
            tekst2: "20.1.2021",
            slika: require("../../assets/8.jpg"),
          },
          {
            id: 3,
            tekst1: "Beograd - Banja Luka",
            tekst3: "600KM",
            tekst2: "3.2.2021",
            slika: require("../../assets/7.jpg"),
          },
          {
            id: 4,
            tekst1: "Sarajevo - Mostar",
            tekst3: "400KM",
            tekst2: "5.3.2021",
            slika: require("../../assets/6.jpg"),
          },
          {
            id: 5,
            user: "neko1",
            tekst1: "Sarajevo - Mostar",
            tekst3: "350KM",
            tekst2: "5.5.2021",
            slika: require("../../assets/5.jpg"),
          },
          {
            id: 6,
            tekst1: "Sarajevo - Mostar",
            tekst3: "450KM",
            tekst2: "10.5.2021",
            slika: require("../../assets/1.jpg"),
          },
          {
            id: 7,
            user: "neko1",
            tekst1: "Sarajevo - Mostar",
            tekst3: "500KM",
            tekst2: "8.7.2021",
            slika: require("../../assets/splash.png"),
          },
        ]; */
    const fetchData = async () => {
      try {
        const collectionRef = db.collection("objava");
        const snapshot = await collectionRef
          .where("userId", "==", firebase.default.auth().currentUser.uid)
          .get();
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setdataSource(newData);
        setdataBackup(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getuser();
    fetchData();
  }, []);

  let date = dataSource;
  return (
    <View>
      <FlatList
        data={dataSource}
        numColumns={2}
        keyExtractor={(listing) => listing.id.toString()}
        ListHeaderComponent={
          <View
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Avatar.Image
              source={{ uri: user ? user.slikaurl : "" }}
              size={100}
            ></Avatar.Image>
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <Title>{user ? user.name : "user"}</Title>
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "center", paddingHorizontal: 5 }}>
                  <Text style={{ fontSize: 20 }}>
                    {dataSource ? Object.keys(dataSource).length : "2"}
                  </Text>
                  <Text style={{ fontSize: 15 }}>objava</Text>
                </View>
              </View>
            </View>
            <AppButton
              color="tipkana"
              title={"kontaktiraj"}
              style={{ paddingTop: 4 }}
            ></AppButton>
          </View>
        }
        renderItem={({ item }) => (
          <AppCard2
            startCity={item.startCity}
            endCity={item.endCity}
            price={item.price}
            tekst3={item.tekst3}
            slika={item.img}
            onPress={() => navigation.navigate("listing", item)}
          />
        )}
        showsVerticalScrollIndicator="false"
      ></FlatList>
    </View>
  );
}

export default Korisnik;
