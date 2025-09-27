import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";

export default function ChooseQuestionEditorScreen({ navigation, route }) {


  const [questionlist, setQuestionList] = useState([])

  const {theme} = route.params;
    
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
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            await questionController.Delete(id);
            await RetriveThemes();
          } 
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Escolha uma Questão</Text>

      <TouchableOpacity onPress={ () => navigation.navigate("EditQuestionScreen", {theme}) } style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, color: 'blue' }}>+ Nova Questão</Text>
      </TouchableOpacity>

      <ScrollView>
        {questionlist.length > 0 ? (
          questionlist.map((question) => (
            <View key={question.id} style={{ marginBottom: 15 }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("EditQuestionScreen",{theme, questionId : question.id })
              }}>
                <Text style={{ fontSize: 18 }}>{question.text}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  CallDelete(question.id);
                  await RetriveThemes();
                }}
              >
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>

            </View>
          ))
        ) : (
          <Text>Nenhuma questão encontrada</Text>
        )}
      </ScrollView>
    </View>
  );
}