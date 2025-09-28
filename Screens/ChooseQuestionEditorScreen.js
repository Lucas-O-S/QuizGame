import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";
import CustomAlert from "../Components/CustomAlert";

export default function ChooseQuestionEditorScreen({ navigation, route }) {
  const [questionlist, setQuestionList] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const { theme } = route.params;
  const questionController = new QuestionController();

  async function RetriveThemes() {
    const list = await questionController.GetByThemeId(theme.id);
    setQuestionList(list ?? []);
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchThemes() {
        await RetriveThemes();
      }
      fetchThemes();
    }, [])
  );

  function CallDelete(id) {
    setQuestionToDelete(id);
    setAlertVisible(true);
  }

  async function handleConfirmDelete() {
    if (questionToDelete !== null) {
      await questionController.Delete(questionToDelete);
      await RetriveThemes();
      setQuestionToDelete(null);
    }
    setAlertVisible(false);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Escolha uma Questão</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("EditQuestionScreen", { theme })}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18, color: "blue" }}>+ Nova Questão</Text>
      </TouchableOpacity>

      <ScrollView>
        {questionlist.length > 0 ? (
          questionlist.map((question) => (
            <View key={question.id} style={{ marginBottom: 15 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditQuestionScreen", { theme, questionId: question.id })
                }
              >
                <Text style={{ fontSize: 18 }}>{question.text}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => CallDelete(question.id)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>Nenhuma questão encontrada</Text>
        )}
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title="Confirmar exclusão"
        message="Deseja realmente excluir?"
        onCancel={() => setAlertVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
}
