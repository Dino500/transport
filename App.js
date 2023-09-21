import { StatusBar } from "expo-status-bar";
import { useField } from "formik";
import firebase from "firebase/app";
import "firebase/firestore";

import React, { Component, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  Settings,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissons from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Store/Reducers/Index";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

import Loginscreen from "./screens/loginscreen";
import Screenlogin from "./screens/Screenlogin";
import Screenregistracija from "./screens/Screenregistracija";
import Main from "./screens/Main/Main";
import Lista from "./screens/Main/Lista";
import colors from "./components/colors/colors";
import ImageInputList from "./screens/Imagepicker/ImageInputList";
import AppButton from "./components/Button";
import navigacijatema from "./screens/Navigacija/navigacijatema";
import Proizvod from "./screens/proizvod";
import { Drowercontent } from "./screens/Drawcontent/Drowcontent";

const Navigacija = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggdIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggdIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loaded, loggdIn } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>kako lako</Text>
        </View>
      );
    }
    if (!loggdIn) {
      return (
        <NavigationContainer theme={navigacijatema}>
          <Navigacija.Navigator
            options={{
              headerTintColor: colors.tipkana,
              headerBackTitle: "vrati",
            }}
          >
            <Navigacija.Screen
              name="back"
              component={Loginscreen}
              options={{
                headerShown: false,
                tabBarLabel: "",
                headerBackTitle: "",
                headerTintColor: colors.tipkana,
              }}
            />
            <Navigacija.Screen
              name="Prijava"
              component={Screenlogin}
              options={{
                headerTransparent: true,
                backgroundColor: "white",
                headerTintColor: colors.tipkana,
              }}
            />
            <Navigacija.Screen
              name="Registracija"
              component={Screenregistracija}
              options={{
                headerTransparent: true,
                backgroundColor: "white",
                headerTintColor: colors.tipkana,
              }}
            />
          </Navigacija.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {},
});

export default App;
