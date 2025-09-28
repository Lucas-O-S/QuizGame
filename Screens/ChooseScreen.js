import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, BackHandler } from "react-native";
import ThemeControler from "../Controller/ThemeController";
import InsertThemeComponent from "../Components/InsertThemeComponent.js";
import SelectQuestionCountModal from "../Components/SelectQuestionCountModal.js"; // import do modal
import styles from "../Styles/CreatorChooseScreenStyles.js";
import QuestionController from "../Controller/QuestionController.js";

export default function CreatorChooseScreen({ navigation }) {
  const [themeList, setThemeList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);

  const [modalQuestionVisible, setModalQuestionVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [questionsCount, setQuestionsCount] = useState({}); 

  const themeControler = new ThemeControler();

  const questionController = new QuestionController();

  async function RetriveThemes() {
    const list = await themeControler.GetAll();
    setThemeList(list ?? []);

    const countObj = {};
    if (list) {
      for (const theme of list) {
        const quantity = (await questionController.GetByThemeId(theme.id)).length
        countObj[theme.id] = quantity;
      }
    }
    setQuestionsCount(countObj);
  }

  useFocusEffect(
    useCallback(() => {
      // carrega os temas
      RetriveThemes();

      // listener de hardware back
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.navigate("StartScreen"); // força voltar para StartScreen
        return true; // bloqueia comportamento padrão
      });

      // cleanup
      return () => subscription.remove();
    }, [navigation])
  );

  function openQuestionCountModal(theme) {
    setSelectedTheme(theme);
    setModalQuestionVisible(true);
  }

  function handleConfirmQuestionCount(numQuestions) {
    if (selectedTheme) {
      navigation.navigate("StartGameScreen", { theme: selectedTheme, numQuestions });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um</Text>

      <InsertThemeComponent
        visible={modalVisible}
        editingTheme={editingTheme}
        onClose={() => {
          setModalVisible(false);
          setEditingTheme(null);
        }}
        onSaveSuccess={async () => {
          await RetriveThemes();
        }}
      />

      <ScrollView>
        {themeList.length > 0 ? (
          themeList.map((theme) => (
            <View key={theme.id} style={styles.themeItem}>
              <TouchableOpacity onPress={() => openQuestionCountModal(theme)}>
                <Text style={styles.themeName}>
                  {theme.name} ({questionsCount[theme.id] ?? 0} perguntas)
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>Nenhum tema encontrado</Text>
        )}
      </ScrollView>

      <SelectQuestionCountModal
        visible={modalQuestionVisible}
        maxQuestions={selectedTheme ? questionsCount[selectedTheme.id] : 1}
        onClose={() => setModalQuestionVisible(false)}
        onConfirm={handleConfirmQuestionCount}
      />
    </View>
  );
}
