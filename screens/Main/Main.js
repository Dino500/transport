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
import Drowercontent from "../Drawcontent/Drowcontent";
import Proizvod from "../proizvod";
import Korisnik2 from "../Korisnik/Korisnik2";
import ImageInputList from "../Imagepicker/ImageInputList";
import colors from "../../components/colors/colors";
import Imagelista from "../Imagepicker/imagelista";
import Postavke from "../Profil/Settings";

const Navigacija = createStackNavigator();
const Drawer = createDrawerNavigator();
const Navigacija2 = createStackNavigator();
const Navigacija3 = createStackNavigator();
const Homestackscreen = ({ navigation }) => (
  <Navigacija2.Navigator>
    <Navigacija2.Screen
      name="Glavni"
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
            onPress={() => navigation.navigate("account")}
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
    <Navigacija3.Screen name="Imagelista" component={Imagelista} />
    <Navigacija3.Screen name="Postavke" component={Postavke} />
    <Navigacija3.Screen name="Korisnik2" component={Korisnik2} />
    <Navigacija3.Screen name="account" component={Imagelista} />
    <Navigacija3.Screen
      name="listing"
      component={Proizvod}
      options={{ headerShown: false, presentation: "modal" }}
      screenOptions={{ presentation: "modal" }}
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
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Main" component={Homestackscreen} />
          <Drawer.Screen name="Postavke" component={Postavke} />
          <Drawer.Screen name="Korisnik2" component={Korisnik2} />
          <Drawer.Screen name="Imagelista" component={Imagelista} />
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
