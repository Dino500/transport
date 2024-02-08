import { auth } from "./firebase.js";

import React, { Component, useEffect } from "react";
import {
  Alert,
  LogBox,
  SafeAreaView,
  Settings,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import Loginscreen from "./screens/loginscreen";
import Screenlogin from "./screens/Screenlogin";
import Screenregistracija from "./screens/Screenregistracija";
import Main from "./screens/Main/Main";

import colors from "./components/colors/colors";

import navigacijatema from "./screens/Navigacija/navigacijatema";

import { StoreProvider, createStore } from "easy-peasy";
import model from "./components/Store/Store.js";
import Toast from "react-native-toast-message";
const Navigacija = createStackNavigator();

const store = createStore(model);

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(["Warning: ..."]);
    auth.onAuthStateChanged((user) => {
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
      <StoreProvider store={store}>
        <Main />
        <Toast position="bottom" />
      </StoreProvider>
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
