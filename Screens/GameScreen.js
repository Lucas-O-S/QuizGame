import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { useCallback, useState } from "react";

import QuestionController from "../Controller/QuestionController";
import AnswerControler from "../Controller/AnswerController";
import AnswerModel from "../Models/AnswerModel";

export default function GameScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  const { questionArray, index: initialIndex, score: initialScore } = route.params ?? {};

  const [index, setIndex] = useState(initialIndex ?? 0);
  const [score, setScore] = useState(initialScore ?? 0);
  const [errors, setErrors] = useState(0);

  const [answerArray, setAnswerArray] = useState([]);
  const [choice, setChoice] = useState(-1); // índice da resposta escolhida

  const question = questionArray[index];
  const [checked, setChecked] = useState("alternativa");

  useFocusEffect(
    useCallback(() => {
      async function loadAnswers() {
        if (!question) return;

        const answers = await answerControler.GetByQuestionIdAndType(question.id, question.type);
        setAnswerArray(answers);
        setChecked(question.type);
        setChoice(-1); // reseta escolha ao carregar nova pergunta
      }

      loadAnswers();
    }, [index])
  );

  // Seleciona resposta
  function selectAnswer(i) {
    setChoice(i);
  }

  // Confirmar resposta
  function confirmAnswer() {
    if (choice === -1) {
      Alert.alert("Escolha uma resposta!");
      return;
    }

    const selectedAnswer = answerArray[choice];

    if (selectedAnswer.isRight) {
      Alert.alert("Correto!");
      setScore(score + 1);
    } else {
      Alert.alert("Errado!");
      setErrors(errors + 1);
    }

    // Próxima pergunta ou final
    if (index + 1 < questionArray.length) {
      setIndex(index + 1);
    } else {
      Alert.alert("Fim do jogo!", `Pontuação final: ${score + (selectedAnswer.isRight ? 1 : 0)}\nErros: ${errors + (selectedAnswer.isRight ? 0 : 1)}`);
      navigation.goBack();
    }
  }

  // Renderiza alternativas
  function renderAlternatives() {
    return answerArray.map((answer, i) => (
      <TouchableOpacity
        key={i}
        style={[
          styles.answerBox,
          choice === i && { borderColor: "#007bff", borderWidth: 2 }
        ]}
        onPress={() => selectAnswer(i)}
      >
        <Text style={styles.answerLabel}>{String.fromCharCode(65 + i)}</Text>
        <Text style={styles.answerText}>{answer.text}</Text>
      </TouchableOpacity>
    ));
  }

  // Renderiza verdadeiro/falso
  function renderTrueFalse() {
    return answerArray.map((answer, i) => (
      <TouchableOpacity
        key={i}
        style={[
          styles.answerBox,
          choice === i && { borderColor: "#007bff", borderWidth: 2 }
        ]}
        onPress={() => selectAnswer(i)}
      >
        <Text style={styles.answerLabel}>{answer.text}</Text>
      </TouchableOpacity>
    ));
  }

  if (!question) return <Text>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]} keyboardShouldPersistTaps="handled">
      {/* Pontuação e erros */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Pontuação: {score}</Text>
        <Text style={styles.statusText}>Erros: {errors}</Text>
      </View>

      {/* Pergunta */}
      <Text style={styles.input}>{question.text}</Text>

      {/* Respostas */}
      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
      </View>

      {/* Botão confirmar */}
      <View>
        <TouchableOpacity onPress={confirmAnswer} style={styles.button}>
          <Text style={styles.buttonText}>Confirmar</Text>
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
