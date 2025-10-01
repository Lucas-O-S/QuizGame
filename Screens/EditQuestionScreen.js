import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, TextInput, View } from "react-native";
import { useCallback, useState } from "react";
import { RadioButton } from "react-native-paper";

import QuestionController from "../Controller/QuestionController";
import AnswerEditor from "../Components/AnswerEditor";
import AnswerControler from "../Controller/AnswerController";
import AnswerModel from "../Models/AnswerModel";
import QuestionModel from "../Models/QuestionModel";
import CustomAlert from "../Components/CustomAlert"; // import do modal customizado
import styles from '../Styles/EditQuestionScreenStyles';

export default function EditQuestionScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  const { theme, questionId } = route.params ?? {};

  const [questionText, setQuestionName] = useState("");

  const [answer1, setAnswer1] = useState(new AnswerModel(null, "", false, questionId ?? null, "alternativa"));
  const [answer2, setAnswer2] = useState(new AnswerModel(null, "", false, questionId ?? null, "alternativa"));
  const [answer3, setAnswer3] = useState(new AnswerModel(null, "", false, questionId ?? null, "alternativa"));
  const [answer4, setAnswer4] = useState(new AnswerModel(null, "", false, questionId ?? null, "alternativa"));

  const [answerTrue, setAnswerTrue] = useState(new AnswerModel(null, "Verdadeiro", false, questionId, "TrueFalse"));
  const [answerFalse, setAnswerFalse] = useState(new AnswerModel(null, "Falso", false, questionId, "TrueFalse"));

  const [editingAnswer, setEditingAnswer] = useState(new AnswerModel());
  const [editingQuestion, setEditingQuestion] = useState(new QuestionModel());

  const [checked, setChecked] = useState("alternativa");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  // Estados do CustomAlert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [onConfirmAlert, setOnConfirmAlert] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function AsyncData() {
        await RetriveData();
      }
      AsyncData()
    }, [])
  );

  async function RetriveData() {
    if (questionId) {
      const question = await questionController.GetById(questionId);
      if (!question) navigation.goBack();
      setChecked(question.type)
      setQuestionName(question.text);

      const answersFound = await answerControler.GetByQuestionIdAndType(question.id, question.type);
      answersFound.forEach((answer, i) => {
        if (question.type == "alternativa") {
          switch (i) {
            case 0: setAnswer1(answer); break;
            case 1: setAnswer2(answer); break;
            case 2: setAnswer3(answer); break;
            case 3: setAnswer4(answer); break;
          }
        } else {
          if (answer.text === "Verdadeiro") setAnswerTrue(answer);
          else setAnswerFalse(answer);
        }
      });
    }
  }

  function renderAlternatives() {
    const answers = [
      { key: "answer1", value: answer1, label: "A" },
      { key: "answer2", value: answer2, label: "B" },
      { key: "answer3", value: answer3, label: "C" },
      { key: "answer4", value: answer4, label: "D" },
    ];

    return answers.map((answer) => (
      <TouchableOpacity
        key={answer.key}
        style={styles.answerBox}
        onPress={() => openEditModal(answer.key)}
      >
        <Text style={styles.answerLabel}>{answer.label}</Text>
        <Text style={styles.answerText}>{answer.value.text || "Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  }

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
        <Text style={styles.answerLabel}>
          {answer.key === "answerTrue" ? "Verdadeiro" : "Falso"}
        </Text>
        <Text style={styles.answerText}>{"Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  }

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

  async function save() {
    if (!questionText) {
      setAlertMessage("Preencha a pergunta");
      setOnConfirmAlert(() => () => setAlertVisible(false));
      setAlertVisible(true);
      return;
    }

    const answers = checked === "alternativa"
      ? [answer1, answer2, answer3, answer4]
      : [answerTrue, answerFalse];

    let rightAnswerFound = false;
    let stop = false;

    for (let answer of answers) {
      if (answer.isRight && !rightAnswerFound) rightAnswerFound = true;
      else if (answer.isRight && rightAnswerFound) stop = true;
    }

    if (stop) {
      setAlertMessage("Deve haver apenas uma resposta certa");
      setOnConfirmAlert(() => () => setAlertVisible(false));
      setAlertVisible(true);
      return;
    }

    if (!rightAnswerFound) {
      setAlertMessage("Deve haver pelo menos uma resposta certa");
      setOnConfirmAlert(() => () => setAlertVisible(false));
      setAlertVisible(true);
      return;
    }

    // Salva questão e respostas
    if (questionId) {
      await questionController.Update(new QuestionModel(questionId, questionText, theme.id, checked));
      for (let answer of answers) {
        await answerControler.Update(new AnswerModel(answer.id, answer.text, answer.isRight, answer.questionId, answer.type));
      }
    } else {
      const newQuestionId = await questionController.Insert(questionText, theme.id, checked);
      for (let answer of answers) {
        await answerControler.Insert(answer.text, answer.isRight, checked, Number(newQuestionId));
      }
    }

    setAlertMessage("Questão salva com sucesso!");
    setOnConfirmAlert(() => () => {
      setAlertVisible(false);
      navigation.goBack();
    });
    setAlertVisible(true);
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: 100 }]}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.title}>
        {questionId ? "Editar Questão" : "Nova Questão"}
      </Text>

      <TextInput
        value={questionText}
        onChangeText={setQuestionName}
        placeholder="Digite a pergunta"
        style={styles.input}
      />

      <AnswerEditor
        visible={modalVisible}
        editingAnswer={editingAnswer}
        onClose={() => setModalVisible(false)}
        onSaveSuccess={(answerData) => {
          const newAnswer = new AnswerModel(
            editingAnswer.id ?? answerData.id,
            answerData.text ?? "",
            answerData.isRight ?? false,
            editingAnswer.questionId ?? questionId,
            editingAnswer.type ?? checked
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

      {!questionId && (
        <View style={styles.radioGroup}>
          <RadioButton.Item
            label="Alternativa"
            value="alternativa"
            status={checked === "alternativa" ? "checked" : "unchecked"}
            onPress={() => setChecked("alternativa")}
          />
          <View style={styles.divider} />
          <View style={styles.radioItem}></View>
          <RadioButton.Item
            label="Verdadeiro/Falso"
            value="TrueFalse"
            status={checked === "TrueFalse" ? "checked" : "unchecked"}
            onPress={() => setChecked("TrueFalse")}
          />
        </View>
      )}

      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
      </View>

      <View>
        <TouchableOpacity onPress={save} style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={onConfirmAlert}
      />
    </ScrollView>
  );
}
