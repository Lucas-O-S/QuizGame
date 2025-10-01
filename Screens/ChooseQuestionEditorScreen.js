import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";
import CustomAlert from "../Components/CustomAlert";
import styles from '../Styles/ChooseQuestionEditorScreenStyles';
import Colors from '../Styles/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma Questão</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("EditQuestionScreen", { theme })}
        style={styles.newQuestionButton}
      >
        <Text style={styles.newQuestionButtonText}>+ Nova Questão</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {questionlist.length > 0 ? (
          questionlist.map((question) => (
            <View key={question.id} style={styles.card}>
              <TouchableOpacity
                style={styles.questionContainer}
                onPress={() =>
                  navigation.navigate("EditQuestionScreen", { theme, questionId: question.id })
                }
              >
                <Text style={styles.questionText}>{question.text}</Text>
              </TouchableOpacity>
              
              <View style={styles.divider} />

              <TouchableOpacity onPress={() => CallDelete(question.id)} style={styles.deleteButton}>
                <FontAwesome5 name="trash" size={18} color={Colors.primary} style={{ marginRight: 8 }} />
                <Text style={styles.deleteText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhuma questão encontrada</Text>
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
