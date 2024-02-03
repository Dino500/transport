import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AppCard from "../../components/AppCard";
import { Avatar, Caption, Text, Title } from "react-native-paper";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";

import AppCard2 from "../../components/AppCard2";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import AppButton from "../../components/Button";

import { useNavigation } from "@react-navigation/native";

function Korisnik({ navigation, route }) {
  const listing = route.params;
  const [dataSource, setdataSource] = useState();
  const [dataBackup, setdataBackup] = useState();
  const [leng, setleng] = useState();
  const [user, setUser] = useState();

  const naviagtion = useNavigation();
  navigation.setOptions({ title: "Profil", headerShown: true });

  const getuser = async () => {
    try {
      const collectionRef = doc(
        db,
        "users",
        listing ? listing.userId : auth.currentUser.uid
      );

      const snapshot = await getDoc(collectionRef);

      const newData = { id: snapshot.id, ...snapshot.data() };

      console.log(newData);
      setUser(newData);
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  };
  const fetchData = async () => {
    try {
      const collectionRef = collection(db, "objava");

      const q = query(
        collectionRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);

      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(newData);
      setdataSource(newData);
      setdataBackup(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
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
