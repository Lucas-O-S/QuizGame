import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { RadioButton } from "react-native-paper";

import QuestionController from "../Controller/QuestionController";
import AnswerEditor from "../Components/AnswerEditor";
import AnswerControler from "../Controller/AnswerController";
import AnswerModel from "../Models/AnswerModel";

export default function EditQuestionScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  const { theme, questionId } = route.params ?? {};

  const [questionName, setQuestionName] = useState("");

  // Respostas para salvar
  const [answer1, setAnswer1] = useState(new AnswerModel(null, "", false, questionId ? questionId : null , "alternativa"));
  const [answer2, setAnswer2] = useState(new AnswerModel(null, "", false, questionId ? questionId : null, "alternativa"));
  const [answer3, setAnswer3] = useState(new AnswerModel(null, "", false, questionId ? questionId : null, "alternativa"));
  const [answer4, setAnswer4] = useState(new AnswerModel(null, "", false, questionId ? questionId : null, "alternativa"));

  const [answerTrue, setAnswerTrue] = useState(new AnswerModel(null, "", false, questionId, "TrueFalse"));
  const [answerFalse, setAnswerFalse] = useState(new AnswerModel(null, "", false, questionId, "TrueFalse"));

  // Resposta temporária
  const [editingAnswer, setEditingAnswer] = useState(new AnswerModel());

  // Tipo da pergunta
  const [checked, setChecked] = useState("alternativa");

  // Modal e edição
  const [modalVisible, setModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  useFocusEffect(
    useCallback(() => {
      // Lógica para carregar dados existentes se necessário
    }, [])
  );

  // Renderiza alternativas
  function renderAlternatives() {
    const answers = [
      { key: "answer1", value: answer1 },
      { key: "answer2", value: answer2 },
      { key: "answer3", value: answer3 },
      { key: "answer4", value: answer4 },
    ];

    return answers.map((answer) => (
      <TouchableOpacity
        key={answer.key}
        style={styles.answerBox}
        onPress={() => openEditModal(answer.key)}
      >
        <Text style={styles.answerLabel}>{answer.key}</Text>
        <Text style={styles.answerText}>{answer.value.text || "Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  }

  // Renderiza verdadeiro ou falso
  function renderTrueFalse() {
    const answers = [
      { key: "answerTrue", value: answerTrue },
      { key: "answerFalse", value: answerFalse },
    ];

    return answers.map((answer) => (
      <TouchableOpacity
        key={answer.key}
        style={styles.answerBox}
        onPress={() => openEditModal(answer.key)}
      >
        <Text style={styles.answerLabel}>{answer.key === "answerTrue" ? "Verdadeiro" : "Falso"}</Text>
        <Text style={styles.answerText}>{answer.value.text || "Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  }

  // Abre modal de edição de resposta
  function openEditModal(key) {
    setEditingKey(key);

    switch (key) {
      case "answer1": setEditingAnswer(answer1); break;
      case "answer2": setEditingAnswer(answer2); break;
      case "answer3": setEditingAnswer(answer3); break;
      case "answer4": setEditingAnswer(answer4); break;
      case "answerTrue": setEditingAnswer(answerTrue); break;
      case "answerFalse": setEditingAnswer(answerFalse); break;
      default: setEditingAnswer(new AnswerModel());
    }

    setModalVisible(true);
  }

  // Salva questão e respostas
  async function save() {
    if (!questionName) {
      alert("Preencha a pergunta");
      return;
    }

    let answers = checked === "alternativa"
      ? [answer1, answer2, answer3, answer4]
      : [answerTrue, answerFalse];

    let rightAnswerFound = false;
    let stop = false;

    for (let answer of answers) {

      if (answer.isRight && !rightAnswerFound) rightAnswerFound = true;
      
      else if (answer.isRight && rightAnswerFound) stop = true;
        }

    if (stop) alert("Deve haver apenas uma resposta certa");
    else if (!rightAnswerFound) alert("Deve haver pelo menos uma resposta certa");
    else {
      const nextid = await questionController.Insert(questionName, theme.id, checked);
      console.log(nextid);
      for(let answer of answers){

        await answerControler.Insert(answer.text, answer.isRight, checked, Number(nextid))
      }
      alert("Questão salva com sucesso!");
      navigation.goBack();
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: 100 }]}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        value={questionName}
        onChangeText={setQuestionName}
        placeholder="Digite a pergunta"
        style={styles.input}
      />

      <View>
        <RadioButton.Item
          label="Alternativa"
          value="alternativa"
          status={checked === "alternativa" ? "checked" : "unchecked"}
          onPress={() => setChecked("alternativa")}
        />
        <RadioButton.Item
          label="Verdadeiro/Falso"
          value="verdadeiroFalse"
          status={checked === "TrueFalse" ? "checked" : "unchecked"}
          onPress={() => setChecked("TrueFalse")}
        />
      </View>

      {/* Modal de edição de resposta */}
      <AnswerEditor
        visible={modalVisible}
        editingAnswer={editingAnswer}
        onClose={() => setModalVisible(false)}
       onSaveSuccess={(answerData) => {
          // answerData já tem text e isRight corretos do modal
          const newAnswer = new AnswerModel(
            editingAnswer.id ?? answerData.id,      // mantém o id se houver
            answerData.text ?? "",                  // garante que não fique undefined
            answerData.isRight ?? false,            // valor do checkbox
            editingAnswer.questionId ?? questionId, // mantém o questionId do original ou usa da pergunta
            editingAnswer.type ?? checked           // mantém o tipo original ou usa o tipo da pergunta
          );

          switch (editingKey) {
            case "answer1": setAnswer1(newAnswer); break;
            case "answer2": setAnswer2(newAnswer); break;
            case "answer3": setAnswer3(newAnswer); break;
            case "answer4": setAnswer4(newAnswer); break;
            case "answerTrue": setAnswerTrue(newAnswer); break;
            case "answerFalse": setAnswerFalse(newAnswer); break;
          }

          setModalVisible(false);
        }}

      />


      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
      </View>

      <View>
        <TouchableOpacity onPress={save} style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
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
});
