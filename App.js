import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { DbHelper } from './Utils/DbHelper';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartScreen from './Screens/StartScreen';
import CreatorChooseScreen from "./Screens/CreatorChooseScreen";
import ChooseQuestionEditorScreen from "./Screens/ChooseQuestionEditorScreen";
import EditQuestionScreen from "./Screens/EditQuestionScreen";
import ChooseScreen from "./Screens/ChooseScreen"
import StartGameScreen from "./Screens/StartGameScreen"
import GameScreen from './Screens/GameScreen';
import GameEndScreen from './Screens/GameEndScreen';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef(); // referência global
const blockedScreens = ["GameScreen", "GameEndScreen"]; // telas que não podem ser acessadas pelo back

export default function App() {
  useEffect(() => {
    DbHelper.StartDb();

    const onBackPress = () => {
      if (!navigationRef.isReady()) return false;

      const state = navigationRef.getRootState();
      const routes = state.routes;
      if (routes && routes.length > 1) {
        const previousRoute = routes[routes.length - 2];
        if (blockedScreens.includes(previousRoute.name)) {
            navigationRef.navigate("StartScreen"); // redireciona direto

          return true;
        }
      }
      return false; 
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen}/>
        <Stack.Screen name="CreatorChooseScreen" component={CreatorChooseScreen}/>
        <Stack.Screen name="ChooseQuestionEditorScreen" component={ChooseQuestionEditorScreen}/>
        <Stack.Screen name="EditQuestionScreen" component={EditQuestionScreen}/>
        <Stack.Screen name="ChooseScreen" component={ChooseScreen}/>
        <Stack.Screen name="StartGameScreen" component={StartGameScreen}/>
        <Stack.Screen name="GameScreen" component={GameScreen}/>
        <Stack.Screen name="GameEndScreen" component={GameEndScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
