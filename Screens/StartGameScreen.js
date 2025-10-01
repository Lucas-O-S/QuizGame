import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "../Styles/StartGameScreenStyles.js"; 
import QuestionController from "../Controller/QuestionController.js";
import { usePulseAnimation, useSlideAnimation } from "../Styles/Animations";

export default function StartGameScreen({ navigation, route }) {
  const { theme, numQuestions } = route.params ?? {}; // limite enviado pelo CreatorChooseScreen
  const questionController = new QuestionController();

  const [questionArray, setQuestionArray] = useState([]);
  const [index, setIndex] = useState(0);

  const pulseAnim1 = usePulseAnimation(1.2, 1500);
  const pulseAnim2 = usePulseAnimation(1.15, 1700);
  const slideAnim = useSlideAnimation(10, 2000);

  useFocusEffect(
    useCallback(() => {
      const getQuestions = async () => {
        const questions = await questionController.GetByThemeId(theme.id);
        if (!questions || questions.length === 0) return;

        // Embaralha o array
        const shuffled = shuffleArray(questions);

        // Corta para a quantidade escolhida
        const limited = shuffled.slice(0, numQuestions);

        setQuestionArray(limited);
      };

      getQuestions();
    }, [theme, numQuestions])
  );

  // Função de shuffle (Fisher-Yates)
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function startGame() {
    navigation.navigate("GameScreen", { questionArray, index: 0, score: 0 });
  }

  return (
    <View style={styles.bg}>

      <Animated.View
        style={[
          styles.circleTopLeft,
          {
            transform: [{ scale: pulseAnim1 }],
            opacity: pulseAnim1.interpolate({
              inputRange: [1, 1.2],
              outputRange: [0.15, 0.3],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circleBottomRight,
          {
            transform: [{ scale: pulseAnim2 }],
            opacity: pulseAnim2.interpolate({
              inputRange: [1, 1.15],
              outputRange: [0.15, 0.28],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.diagonalLine,
          {
            transform: [
              { rotate: "25deg" },
              { translateX: slideAnim },
            ],
          },
        ]}
      />

      <Text style={styles.title}>Tema: {theme.name}</Text>
      <Text style={styles.infoText}>
        Total de perguntas selecionadas: {questionArray.length}
        </Text>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={startGame}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}