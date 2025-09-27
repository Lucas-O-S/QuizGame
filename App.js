import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DbHelper } from './Utils/DbHelper';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import startScreen from './Screens/StartScreen';
import creatorChooseScreen from "./Screens/CreatorChooseScreen";
import ChooseQuestionEditorScreen from "./Screens/ChooseQuestionEditorScreen";
import EditQuestionScreen from "./Screens/EditQuestionScreen";
import ChooseScreen from "./Screens/ChooseScreen"
import StartGameScreen from "./Screens/StartGameScreen"
import GameScreen from './Screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=> {
    DbHelper.StartDb();
  },[])
  

  return (
    <NavigationContainer>
      <Stack.Navigator InicialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={startScreen}/>
        <Stack.Screen name="CreatorChooseScreen" component={creatorChooseScreen}/>
        <Stack.Screen name="ChooseQuestionEditorScreen" component={ChooseQuestionEditorScreen}/>
        <Stack.Screen name="EditQuestionScreen" component={EditQuestionScreen}/>
        <Stack.Screen name="ChooseScreen" component={ChooseScreen}/>
        <Stack.Screen name="StartGameScreen" component={StartGameScreen}/>
        <Stack.Screen name="GameScreen" component={GameScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

