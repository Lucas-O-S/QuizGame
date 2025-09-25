import { useFocusEffect } from "@react-navigation/native";
import {ScrollView,Text,TouchableOpacity,TextInput,Image,StyleSheet,} from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import AnswerEditor from "../Components/AnswerEditor";
import AnswerControler from "../Controller/AnswerController";

export default function EditQuestionScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  ///A questao a mudar
  const [questionName, setQuestionName] = useState("");

  //A imagem a salvar
  const [imageUri, setImageUri] = useState(null);

  ///Muda as resposta para salvar
  const [answer1, setAnswer1] = useState(new answer());
  const [answer2, setAnswer2] = useState(new answer());
  const [answer3, setAnswer3] = useState(new answer());
  const [answer4, setAnswer4] = useState(new answer());

  const [answerTrue, setAnswerTrue] = useState(new answer());
  const [answerFalse, setAnswerFalse] = useState(new answer());

  ///Resposta temporaria
  const [editingAnswer, setEditingAnswer] = useState(new answer());

  //Qual o estado da radio box
  const [checked, setChecked] = useState("alternativa");

  //Ativa a modal
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Lógica para carregar dados existentes se necessário
    }, [])
  );

  //Parte relacionada a imagem da questão
  async function handleSelectImage(){
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria foi negada.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const openEditModal = (answerKey) => {
    setEditingAnswer(answerKey);
    setModalVisible(true);
  };


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
        <Text style={styles.answerLabel}>{answer.label}:</Text>
        <Text style={styles.answerText}>{answer.value || "Toque para editar"}</Text>
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
        <Text style={styles.answerLabel}>{answer.label}:</Text>
        <Text style={styles.answerText}>{answer.value || "Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  };

  async function save(){
    await questionController.Ins
  }

  ///Tela principal
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        value={questionName}
        onChangeText={setQuestionName}
        placeholder="Digite a pergunta"
        style={styles.input}
      />

      <TouchableOpacity style={styles.imageBox} onPress={handleSelectImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Toque para selecionar imagem</Text>
        )}
      </TouchableOpacity>

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

        //libera para edita
        editingAnswer={editingAnswer}

        //Fecha
        onClose={() => setModalVisible(false)}
        
        ///escolhe em qual lugar salvar o que mudou
        onSaveSuccess={(answer) => {
          if (editingAnswer === "answer1") setAnswer1(answer);
          else if (editingAnswer === "answer2") setAnswer2(answer);
          else if (editingAnswer === "answer3") setAnswer3(answer);
          else if (editingAnswer === "answer4") setAnswer4(answer);
          else if (editingAnswer === "answerTrue") setAnswerTrue(answer);
          else if (editingAnswer === "answerFalse") setAnswerFalse(answer);
          setModalVisible(false);
        }}

      />

      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
      </View>

      <View>
        <TouchableOpacity
          //onPress={}
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
  imageBox: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#999",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
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
