import { StatusBar } from "expo-status-bar";
import { useField } from "formik";
import * as firebase from "firebase";
import React, { Component, useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissons from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
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

const firebaseConfig = {
  apiKey: "AIzaSyCPlbmonMVoxTy5zujgV-FoH1HdJzIsles",
  authDomain: "transport-806c6.firebaseapp.com",
  projectId: "transport-806c6",
  storageBucket: "transport-806c6.appspot.com",
  messagingSenderId: "856271773667",
  appId: "1:856271773667:web:bbd889fe66dfa349308ad6",
  measurementId: "G-5KYZTLEXM8",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Navigacija = createStackNavigator();

const Navigacija2 = createStackNavigator();

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
          <Navigacija.Navigator options={{ headerTintColor: colors.tipkana }}>
            <Navigacija.Screen
              name="welcom"
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
                headerBackTitle: "vrati",
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
      <NavigationContainer theme={navigacijatema}>
        <Navigacija2.Navigator>
          <Navigacija2.Screen
            name="main"
            component={Main}
            cardStyle={{ backgroundColor: colors.primary }}
            options={{
              headerRight: () => (
                <Ionicons
                  name="add-circle-outline"
                  color={colors.primary}
                  size={35}
                  style={{ paddingRight: 10 }}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  name="person"
                  color={colors.primary}
                  size={30}
                  style={{ paddingLeft: 10 }}
                />
              ),
            }}
          />
          <Navigacija2.Screen name="drugi" component={ImageInputList} />
        </Navigacija2.Navigator>
      </NavigationContainer>
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
