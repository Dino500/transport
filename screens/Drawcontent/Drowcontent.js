import { View, StyleSheet } from "react-native";
import * as firebase from "firebase/app";
import firestore from 'firebase/firestore';
import React, { Component } from "react";
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

let useres;
export class Drowercontent extends Component {
  state = {
    name: "",
  };

  constructor(prop) {
    super(prop);
    firebase.default
      .firestore()
      .collection("users")
      .doc(firebase.default.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data().name);
        this.setState({
          name: snapshot.data().name
        });
        useres = snapshot.data().name;
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...this.props}>
          <View>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <View>
                <Avatar.Image
                  source={require("../../assets/icon.png")}
                  size={50}
                />
              </View>
              <View style={{ marginLeft: 20 }}>
                <Title>{useres}</Title>
                <Caption>{firebase.default.auth().currentUser.email}</Caption>
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
              firebase.default.auth().signOut();
            }}
          ></Drawer.Item>
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boromdrower: {
    marginLeft: 10,
    marginBottom: 30,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});