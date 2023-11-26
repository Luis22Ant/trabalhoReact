import { StatusBar } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import {AppLoading} from 'expo';
import {useFonts,Anton_400Regular} from '@expo-google-fonts/anton';

export default function App() {

  let [fontsLoad] = useFonts ({
      Anton_400Regular
  });

  // if(!fontsLoad){
  //   return <AppLoading/>
  // }


  return (
<NavigationContainer>
  <StatusBar backgroundColor="#38A69D" barStyle="light-content"/>
  <Routes></Routes>
</NavigationContainer>
  );
}
