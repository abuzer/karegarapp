import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Signup from "./Signup";
import PasswordResetScreen from "./PasswordResetScreen";

import LoginRoute from "./LoginRoute";
import { createAppContainer } from 'react-navigation';
import KG_Services from "./KG_Services";
// import AppHome from "../App.js";
import HomeScreen from "../screens/Home";

export default class Auth extends Component {


  render() {
    return (
      <MAauthppContainer />
    )

  }
}

const AuthStack = createStackNavigator(
  {
    SignIn: LoginRoute,
    SignUp: Signup,
    PasswordReset: PasswordResetScreen,
    App: KG_Services,
    AppHome: {
      screen: () => <HomeScreen />
    },
  },
  {
    headerMode: 'none',
    initialRouteName: "SignIn",
  }
);
const MAauthppContainer = createAppContainer(AuthStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
  }
});
