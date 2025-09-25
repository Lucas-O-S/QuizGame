import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import AnswerEditor from "../Components/AnswerEditor";

export default function EditQuestionScreen({ navigation, route }) {
  const questionController = new QuestionController();

  const [questionName, setQuestionName] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");

  const [answerTrue, setAnswerTrue] = useState("");
  const [answerFalse, setAnswerFalse] = useState("");

  const [editingAnswer, setEditingAnswer] = useState(null);
  const [checked, setChecked] = useState("alternativa");
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Lógica para carregar dados existentes se necessário
    }, [])
  );

  const handleSelectImage = async () => {
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

  const renderAlternatives = () => {
    const answers = [
      { key: "answer1", label: "A", value: answer1, setter: setAnswer1 },
      { key: "answer2", label: "B", value: answer2, setter: setAnswer2 },
      { key: "answer3", label: "C", value: answer3, setter: setAnswer3 },
      { key: "answer4", label: "D", value: answer4, setter: setAnswer4 },
    ];

    return answers.map((ans, i) => (
      <TouchableOpacity
        key={ans.key}
        style={styles.answerBox}
        onPress={() => openEditModal(ans.key)}
      >
        <Text style={styles.answerLabel}>{ans.label}:</Text>
        <Text style={styles.answerText}>{ans.value || "Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  };

  const renderTrueFalse = () => {
    const answers = [
      { key: "answerTrue", label: "Verdadeiro", value: answerTrue, setter: setAnswerTrue },
      { key: "answerFalse", label: "Falso", value: answerFalse, setter: setAnswerFalse },
    ];

    return answers.map((ans) => (
      <TouchableOpacity
        key={ans.key}
        style={styles.answerBox}
        onPress={() => openEditModal(ans.key)}
      >
        <Text style={styles.answerLabel}>{ans.label}:</Text>
        <Text style={styles.answerText}>{ans.value || "Toque para editar"}</Text>
      </TouchableOpacity>
    ));
  };

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
        onSaveSuccess={(updatedText) => {
          if (editingAnswer === "answer1") setAnswer1(updatedText);
          if (editingAnswer === "answer2") setAnswer2(updatedText);
          if (editingAnswer === "answer3") setAnswer3(updatedText);
          if (editingAnswer === "answer4") setAnswer4(updatedText);
          if (editingAnswer === "answerTrue") setAnswerTrue(updatedText);
          if (editingAnswer === "answerFalse") setAnswerFalse(updatedText);
          setModalVisible(false);
        }}
      />

      <View style={styles.answersContainer}>
        {checked === "alternativa" ? renderAlternatives() : renderTrueFalse()}
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
