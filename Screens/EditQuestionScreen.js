import { useFocusEffect } from "@react-navigation/native";
import {ScrollView,Text,TouchableOpacity,TextInput,Image,StyleSheet,View} from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import AnswerEditor from "../Components/AnswerEditor";
import AnswerControler from "../Controller/AnswerController";
import AnswerModel from "../Models/AnswerModel";

export default function EditQuestionScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  const {theme, questionId} = route.params ?? null;

  ///A questao a mudar
  const [questionName, setQuestionName] = useState("");


  ///Muda as resposta para salvar
  const [answer1, setAnswer1] = useState(new AnswerModel());
  const [answer2, setAnswer2] = useState(new AnswerModel());
  const [answer3, setAnswer3] = useState(new AnswerModel());
  const [answer4, setAnswer4] = useState(new AnswerModel());

  const [answerTrue, setAnswerTrue] = useState(new AnswerModel());
  const [answerFalse, setAnswerFalse] = useState(new AnswerModel());

  ///Resposta temporaria
  const [editingAnswer, setEditingAnswer] = useState(new AnswerModel());

  //Qual o estado da radio box
  const [checked, setChecked] = useState("alternativa");

  //Ativa a modal
  const [modalVisible, setModalVisible] = useState(false);
    // Qual resposta está sendo editada (chave)
    const [editingKey, setEditingKey] = useState(null);

  useFocusEffect(
    useCallback(() => {
      // Lógica para carregar dados existentes se necessário
    }, [])
  );

  // Removido: Função de seleção de imagem
  //Rederiza alternativas
  function renderAlternatives(){
    const answers = [
      { key: "answer1", label: answer1.text, value: answer1, setter: setAnswer1 },
      { key: "answer2", label: answer2.text, value: answer2, setter: setAnswer2 },
      { key: "answer3", label: answer3.text, value: answer3, setter: setAnswer3 },
      { key: "answer4", label: answer4.text, value: answer4, setter: setAnswer4 },
    ];

    return answers.map((answer, i) => (
      <TouchableOpacity
        key={answer.key}
        style={styles.answerBox}
          onPress={() => openEditModal(answer.key)}
      >
        <Text style={styles.answerLabel}>{answer.label}</Text>
          <Text style={styles.answerText}>{answer.value.text || "Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  };

  //Renderiza verdadeiro ou false
  function renderTrueFalse() {
    const answers = [
      { key: "answerTrue", label: "Verdadeiro", value: answerTrue, setter: setAnswerTrue },
      { key: "answerFalse", label: "Falso", value: answerFalse, setter: setAnswerFalse },
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
  };

  // Abre modal de edição de resposta
  function openEditModal(key) {
    setEditingKey(key);
    // Define o objeto de resposta a editar
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

  // Função para salvar questão e respostas
  async function save() {
    if (!questionName) {
      alert("Preencha a pergunta");
      return;
    }

    // Usa QuestionModel.insert
    const type = checked;

    let answers = []
    let stop = false;

    // Salva as respostas
    if (checked === "alternativa") {
      answers = [answer1, answer2, answer3, answer4]
    } else {
      answers = [answerTrue, answerFalse]
    }

    let rightAnswerFound = false;

    for(let answer in answers){
      if(answer.isRight && !rightAnswerFound) rightAnswerFound = true;
      else if(answer.isRight && rightAnswerFound) stop = true;
    }

    if(stop) alert("Deve haver apenas uma resposta certa");
    else if(rightAnswerFound) alert("Deve haver pelo menos uma resposta certa")
    else{
      console.log(theme.id + " " + theme.text);
      await questionController.Insert(questionName, theme.id, checked);
      alert("Questão salva com sucesso!");
      navigation.goBack();
    }
  }

  ///Tela principal
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

      {/* Removido: UI de seleção de imagem */}

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
          status={checked === "verdadeiroFalse" ? "checked" : "unchecked"}
          onPress={() => setChecked("verdadeiroFalse")}
        />
      </View>

      {/* Modal de edição de resposta */}
      <AnswerEditor
        visible={modalVisible}
        editingAnswer={editingAnswer}
        onClose={() => setModalVisible(false)}
        onSaveSuccess={(answer) => {
          switch (editingKey) {
            case "answer1": setAnswer1(answer); break;
            case "answer2": setAnswer2(answer); break;
            case "answer3": setAnswer3(answer); break;
            case "answer4": setAnswer4(answer); break;
            case "answerTrue": setAnswerTrue(answer); break;
            case "answerFalse": setAnswerFalse(answer); break;
            default: break;
          }
          setModalVisible(false);
        }}

      />

      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
      </View>

      <View>
        <TouchableOpacity
          onPress={save}
        >
          <Text>Salvar</Text>
        </TouchableOpacity>

      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  // Removido: estilos relacionados à imagem
  answersContainer: {
    marginTop: 20,
  },
  answerBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  answerLabel: {
    fontWeight: "bold",
  },
  answerText: {
    marginTop: 4,
    color: "#333",
  },
});
