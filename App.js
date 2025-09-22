import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DbHelper } from './Utils/DbHelper';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartScreen from './Screens/StartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=> {
    DbHelper.StartDb();
  },[])
  

  return (
    <NavigationContainer>
      <Stack.Navigator InicialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

