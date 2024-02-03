import { View, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.js";

import React, { useEffect, useState } from "react";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

const Drowercontent = (props) => {
  const [user, setUser] = useState();

  const getuser = async () => {
    try {
      const collectionRef = doc(db, "users", auth.currentUser.uid);

      const snapshot = await getDoc(collectionRef);

      const newData = { id: snapshot.id, ...snapshot.data() };

      console.log(newData);
      setUser(newData);
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getuser();
    console.log(user, "otvoreno");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <View>
              <Avatar.Image
                source={{
                  uri: user ? user.slikaurl : "",
                }}
                size={50}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Title>{user ? user.name : "loading"}</Title>
              <Caption>{auth.currentUser.email}</Caption>
            </View>
          </View>
        </View>

        <Drawer.Section style={styles.profil}>
          <Drawer.Item
            label="Glavna"
            icon={({ color, size }) => (
              <Ionicons name="home" color={"gray"} size={20} />
            )}
            onPress={() => {
              props.navigation.navigate("Glavni");
            }}
          ></Drawer.Item>
          <Drawer.Item
            label="Profil"
            icon={({ color, size }) => (
              <Ionicons name="person" color={"gray"} size={20} />
            )}
            onPress={() => {
              props.navigation.navigate("Korisnik2");
            }}
          ></Drawer.Item>
        </Drawer.Section>
        <Drawer.Item
          label="Postavke"
          icon={({ color, size }) => (
            <Ionicons name="settings" color={"gray"} size={20} />
          )}
          onPress={() => {
            props.navigation.navigate("Postavke");
          }}
        ></Drawer.Item>
        <Drawer.Item
          label="Dodaj"
          icon={({ color, size }) => (
            <Ionicons name="add" color={"gray"} size={20} />
          )}
          onPress={() => {
            props.navigation.navigate("Imagelista");
          }}
        ></Drawer.Item>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.boromdrower}>
        <Drawer.Item
          label="Odjavi se"
          icon={({ color, size }) => (
            <Ionicons
              style={styles.Ionicons}
              name="log-out"
              color={"gray"}
              size={20}
            />
          )}
          onPress={() => {
            auth.signOut();
          }}
        ></Drawer.Item>
      </Drawer.Section>
    </View>
  );
};

export default Drowercontent;
const styles = StyleSheet.create({
  boromdrower: {
    marginLeft: 10,
    marginBottom: 30,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  profil: {
    paddingTop: 30,
  },
});
