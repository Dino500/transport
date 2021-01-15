import { View, StyleSheet } from "react-native";
import * as firebase from "firebase/app";
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

var useres;
export class Drowercontent extends Component {
  state = {
    name: "",
  };

  constructor(prop) {
    super(prop);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data().name);
        this.setState({
          name: snapshot.data().name,
        });
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
                <Title>{this.state.name}</Title>
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
}

const styles = StyleSheet.create({
  boromdrower: {
    marginLeft: 10,
    marginBottom: 30,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
