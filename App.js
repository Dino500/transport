import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AppText from './components/AppText';
import AppButton from './components/Button';
import Loginscreen from './screens/loginscreen'
import AppTextimput from './components/AppTextimput';
import Proizvod from './screens/proizvod';
import Korisnik from "./components/Korisnik"
import Lista from './screens/Lista';
import Screenlogin from './screens/Screenlogin';
import Screenregistracija from './screens/Screenregistracija';
export default function App() {
  return (
    
<View>

  <Screenregistracija/>
    
 
</View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view:{
    

  }
});
