import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useState } from "react";

import QuestionController from "../Controller/QuestionController";
import AnswerControler from "../Controller/AnswerController";
import CustomAlert from "../Components/CustomAlert"; 
import styles from '../Styles/GameScreenStyles';

export default function GameScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  const { questionArray, index: initialIndex, score: initialScore } = route.params ?? {};

  const [index, setIndex] = useState(initialIndex ?? 0);
  const [score, setScore] = useState(initialScore ?? 0);
  const [errors, setErrors] = useState(0);

  const [answerArray, setAnswerArray] = useState([]);
  const [choice, setChoice] = useState(-1);
  const [answered, setAnswered] = useState(false);

  const question = questionArray[index];
  const [checked, setChecked] = useState("alternativa");

  // CustomAlert estados
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [onConfirmAlert, setOnConfirmAlert] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function loadAnswers() {
        if (!question) return;

        const answers = await answerControler.GetByQuestionIdAndType(question.id, question.type);
        setAnswerArray(answers);
        setChecked(question.type);
        setChoice(-1);
        setAnswered(false);
      }

      loadAnswers();
    }, [index])
  );

  function selectAnswer(i) {
    if (answered) return;
    setChoice(i);
  }

  function handleConfirm() {
    if (!answered) {
      if (choice === -1) return;
      const selected = answerArray[choice];
      if (selected.isRight) setScore(score + 1);
      else setErrors(errors + 1);
      setAnswered(true);
    } else {
      if (index + 1 < questionArray.length) setIndex(index + 1);
      else navigation.navigate("GameEndScreen", {score, errors, totalQuestions: questionArray.length});
    }
  }

  function renderAlternatives() {
    return answerArray.map((answer, i) => {
      let style = [styles.answerBox];
      if (answered) {
        if (answer.isRight) style.push({ borderColor: "green", borderWidth: 2 });
        if (i === choice && !answer.isRight) style.push({ borderColor: "red", borderWidth: 2 });
      } else if (i === choice) {
        style.push(styles.selectedAnswer);
      }

      return (
        <TouchableOpacity key={i} style={style} onPress={() => selectAnswer(i)}>
          <Text style={styles.answerLabel}>{String.fromCharCode(65 + i)}</Text>
          <Text style={styles.answerText}>{answer.text}</Text>
        </TouchableOpacity>
      );
    });
  }

  function renderTrueFalse() {
    return answerArray.map((answer, i) => {
      let style = [styles.answerBox];
      if (answered) {
        if (answer.isRight) style.push(styles.correctAnswer);
        if (i === choice && !answer.isRight) style.push(styles.wrongAnswer);
      } else if (i === choice) {
        style.push(styles.selectedAnswer);
      }

      return (
        <TouchableOpacity key={i} style={style} onPress={() => selectAnswer(i)}>
          <Text style={styles.answerLabel}>{answer.text}</Text>
        </TouchableOpacity>
      );
    });
  }

  if (!question) return <Text style={styles.loadingText}>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]} keyboardShouldPersistTaps="handled">
      <View style={styles.statusContainer}>
        <Text style={styles.points}>Pontuação: {score}</Text>
        <Text style={styles.errors}>Erros: {errors}</Text>
      </View>

      <Text style={styles.text}>{question.text}</Text>

      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
      </View>

      {answered && choice !== -1 && (
        <Text style={styles.feedbackText}>
          {answerArray[choice].isRight ? "Você acertou!" : `Errado! A resposta correta é: ${answerArray.find(a => a.isRight).text}`}
        </Text>
      )}

      <View>
        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.buttonText}>{answered ? "Próxima" : "Confirmar"}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            setAlertMessage("Tem certeza que deseja desistir? Sua pontuação será perdida.");
            setOnConfirmAlert(() => () => {
              setAlertVisible(false);
              navigation.navigate("ChooseScreen");
            });
            setAlertVisible(true);
          }}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={onConfirmAlert}
        onCancel={() => setAlertVisible(false)} // mantém botão cancelar dentro do modal
      />
    </ScrollView>
  );
}
