import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Lista from "./Lista";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import navigacijatema from "../Navigacija/navigacijatema";
import { Drowercontent } from "../Drawcontent/Drowcontent";
import Proizvod from "../proizvod";

import ImageInputList from "../Imagepicker/ImageInputList";
import colors from "../../components/colors/colors";
import imagelista from "../Imagepicker/imagelista";
import setings from "../Profil/setings";

const Navigacija = createStackNavigator();
const Drawer = createDrawerNavigator();
const Navigacija2 = createStackNavigator();
const Navigacija3 = createStackNavigator();
const Homestackscreen = ({ navigation }) => (
  <Navigacija2.Navigator mode="modal">
    <Navigacija2.Screen
      name="main"
      component={Lista}
      cardStyle={{ backgroundColor: colors.primary }}
      options={{
        headerTitle: "Glavna",
        headerRight: () => (
          <Ionicons
            name="add-circle-outline"
            color={colors.primary}
            size={30}
            style={{ paddingRight: 10, paddingTop: 5 }}
            onPress={() => navigation.navigate("Dodaj")}
          />
        ),
        headerLeft: () => (
          <Ionicons.Button
            name="person-circle-outline"
            color={colors.primary}
            size={30}
            backgroundColor="white"
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <Navigacija3.Screen name="Dodaj" component={imagelista} />
    <Navigacija3.Screen name="setings" component={setings}/>
    <Navigacija3.Screen name="account" component={imagelista} />
    <Navigacija3.Screen
      name="listing"
      component={Proizvod}
      options={{ headerShown: false }}
    />
  </Navigacija2.Navigator>
);
const Detailstackscreen = ({ navigation }) => (
  <Navigacija3.Navigator></Navigacija3.Navigator>
);

export class Main extends Component {
  componentDidMount() {}

  render() {
    return (
      <NavigationContainer theme={navigacijatema}>
        <Drawer.Navigator
          drawerContent={(props) => <Drowercontent {...props} />}
        >
          <Drawer.Screen name="main" component={Homestackscreen} />
          <Drawer.Screen name="setings" component={setings} />
          <Drawer.Screen name="list" component={imagelista} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  ime: {
    flex: 1,
    borderBottomColor: "white",
  },
  pretraga: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  app: {
    flex: 1,
  },
});
export default Main;
