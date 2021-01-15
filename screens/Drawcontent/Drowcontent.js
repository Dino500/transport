import { View, StyleSheet } from "react-native";
import * as  firebase from "firebase/app";
import React from "react";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
  Text,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export function Drowercontent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <View>
              <Avatar.Image
                source={require("../../assets/icon.png")}
                size={50}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Title>{firebase.firestore().doc("users").}</Title>
              <Caption>{firebase.auth().currentUser.email}</Caption>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.boromdrower}>
        <Drawer.Item
          label="Odjavi se"
          icon={({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          )}
          onPress={() => {
            firebase.auth().signOut();
          }}
        ></Drawer.Item>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  boromdrower: {
    marginLeft: 10,
    marginBottom: 30,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
