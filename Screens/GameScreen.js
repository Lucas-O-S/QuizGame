import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";

import QuestionController from "../Controller/QuestionController";
import AnswerControler from "../Controller/AnswerController";

export default function GameScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  const { questionArray, index: initialIndex, score: initialScore } = route.params ?? {};

  const [index, setIndex] = useState(initialIndex ?? 0);
  const [score, setScore] = useState(initialScore ?? 0);
  const [errors, setErrors] = useState(0);

  const [answerArray, setAnswerArray] = useState([]);
  const [choice, setChoice] = useState(-1); // índice da resposta escolhida
  const [answered, setAnswered] = useState(false); // se já respondeu

  const question = questionArray[index];
  const [checked, setChecked] = useState("alternativa");

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

  // Seleciona resposta
  function selectAnswer(i) {
    if (answered) return; // não permite mudar após responder
    setChoice(i);
  }

  // Confirmar ou seguir
  function handleConfirm() {
    if (!answered) {
      if (choice === -1) return; // nada selecionado
      const selected = answerArray[choice];
      const correctAnswer = answerArray.find(a => a.isRight);

      if (selected.isRight) {
        setScore(score + 1);
      } else {
        setErrors(errors + 1);
      }

      setAnswered(true);
    } else {
      // Avança para próxima pergunta
      if (index + 1 < questionArray.length) {
        setIndex(index + 1);
      } else {
        navigation.navigate("GameEndScreen", {score, errors, totalQuestions : questionArray.length}); // ou tela de resultados
      }
    }
  }

  // Renderiza alternativas
  function renderAlternatives() {
    const correctAnswer = answerArray.find(a => a.isRight);
    return answerArray.map((answer, i) => {
      let style = [styles.answerBox];
      if (answered) {
        if (answer.isRight) style.push({ borderColor: "green", borderWidth: 2 });
        if (i === choice && !answer.isRight) style.push({ borderColor: "red", borderWidth: 2 });
      } else if (i === choice) {
        style.push({ borderColor: "#007bff", borderWidth: 2 });
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
    const correctAnswer = answerArray.find(a => a.isRight);
    return answerArray.map((answer, i) => {
      let style = [styles.answerBox];
      if (answered) {
        if (answer.isRight) style.push({ borderColor: "green", borderWidth: 2 });
        if (i === choice && !answer.isRight) style.push({ borderColor: "red", borderWidth: 2 });
      } else if (i === choice) {
        style.push({ borderColor: "#007bff", borderWidth: 2 });
      }

      return (
        <TouchableOpacity key={i} style={style} onPress={() => selectAnswer(i)}>
          <Text style={styles.answerLabel}>{answer.text}</Text>
        </TouchableOpacity>
      );
    });
  }

  if (!question) return <Text>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]} keyboardShouldPersistTaps="handled">
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Pontuação: {score}</Text>
        <Text style={styles.statusText}>Erros: {errors}</Text>
      </View>

      <Text style={styles.input}>{question.text}</Text>

      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
      </View>

      {answered && choice !== -1 && (
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 16 }}>
          {answerArray[choice].isRight ? "Você acertou!" : `Errado! A resposta correta é: ${answerArray.find(a => a.isRight).text}`}
        </Text>
      )}

      <View>
        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.buttonText}>{answered ? "Próxima" : "Confirmar"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  answersContainer: { marginTop: 20 },
  answerBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  answerLabel: { fontWeight: "bold" },
  answerText: { marginTop: 4, color: "#333" },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  statusContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  statusText: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
