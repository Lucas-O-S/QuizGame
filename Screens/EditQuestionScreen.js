import { useFocusEffect } from "@react-navigation/native";
import {ScrollView,Text,TouchableOpacity,TextInput,Image,StyleSheet,View} from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import AnswerEditor from "../Components/AnswerEditor";
import AnswerControler from "../Controller/AnswerController";
import AnswerModel from "../Models/AnswerModel";
import * as FileSystem from "expo-file-system";

export default function EditQuestionScreen({ navigation, route }) {
  const questionController = new QuestionController();
  const answerControler = new AnswerControler();

  ///A questao a mudar
  const [questionName, setQuestionName] = useState("");

  //A imagem a salvar
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

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
      base64: false, // não pega aqui direto
    });

    if (!result.canceled && result.assets?.length > 0) {
      const selectedImage = result.assets[0];
      setImageUri(selectedImage.uri); // Mostra a imagem

      //CONVERTE PARA BASE64
      const base64Image = await FileSystem.readAsStringAsync(selectedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      //Armazena em outro state, ex:
      setImageBase64(base64Image); // novo state que você vai criar abaixo
    }
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
    const themeId = route?.params?.theme?.id;
    if (!questionName || !themeId) {
      alert("Preencha a pergunta e selecione o tema.");
      return;
    }
    // Usa QuestionModel.insert
    const type = checked;
    await QuestionModel.insert({ text: questionName, imgString: imageBase64, themeId, type });
  
    let answers = []
    let stop;

    // Salva as respostas
    if (checked === "alternativa") {

      answers = [answer1, answer2, answer3, answer4]

    } else {
      answers = [answerTrue, answerFalse]
    }

    let rightAnswerFound = false;

    for(let answer in answers){
      if(answer.right && !rightAnswerFound) rightAnswerFound = true;
      
      else if(answer.right && rightAnswerFound) stop = true;

    }

    if(stop = true) alert("Deve haver apenas uma resposta certa");

    if(rightAnswerFound == false) alert("Deve haver uma resposta certa")

    alert("Questão salva com sucesso!");
    navigation.goBack();
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
