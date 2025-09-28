import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, BackHandler } from "react-native";
import ThemeControler from "../Controller/ThemeController";
import InsertThemeComponent from "../Components/InsertThemeComponent.js";
import styles from "../Styles/CreatorChooseScreenStyles.js";

export default function CreatorChooseScreen({ navigation }) {
  const [themeList, setThemeList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);

  const themeControler = new ThemeControler();

  async function RetriveThemes() {
    const list = await themeControler.GetAll();
    setThemeList(list ?? []);
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
              <TouchableOpacity
                onPress={() => navigation.navigate("StartGameScreen", { theme })}
              >
                <Text style={styles.themeName}>{theme.name}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>Nenhum tema encontrado</Text>
        )}
      </ScrollView>
    </View>
  );
}
