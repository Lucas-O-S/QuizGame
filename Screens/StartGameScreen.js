import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Styles/StartScreenStyles.js"; 
import QuestionController from "../Controller/QuestionController.js";

export default function CreatorChooseScreen({ navigation, route }) {
  const { theme } = route.params ?? {};

  const questionController = new QuestionController();

  const [questionArray, setQuestionArray] = useState([]);
  const [index, setIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const getQuestions = async () => { setQuestionArray(await questionController.GetByThemeId(theme.id));};
      getQuestions();

    }, [])
  );

  function startGame(){
    
    navigation.navigate("GameScreen", {questionArray, index, score : 0})
  }

  return (
    <View style={styles.bg}>
      <Text style={styles.title}>Tema: {theme.name}</Text>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button1}
          onPress={startGame}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
