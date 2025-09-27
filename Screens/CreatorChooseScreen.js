import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import ThemeControler from "../Controller/ThemeController";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
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
      async function fetchThemes() {
        await RetriveThemes();
      }
      fetchThemes();
    }, [])
  );

  function openCreateModal() {
    setEditingTheme(null);       // criando um novo tema
    setModalVisible(true);
  }

  function openEditModal(theme) {
    setEditingTheme(theme);      // editando tema existente
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um</Text>

      <TouchableOpacity onPress={openCreateModal} style={{ marginBottom: 20 }}>
        <Text style={styles.buttonText}>+ Novo Tema</Text>
      </TouchableOpacity>

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
        { themeList.length > 0 ? (
          themeList.map((theme) => (
            <View key={theme.id} style={styles.themeItem}>
              <TouchableOpacity onPress={() => navigation.navigate("ChooseQuestionEditorScreen", {theme})}>
                <Text style={styles.themeName}>{theme.name }</Text>
              </TouchableOpacity>
              
              <View style = {styles.buttonGroup}>
                <TouchableOpacity onPress={() => openEditModal(theme)}
                  style = {[styles.button, styles.buttonRename]}>
                  <Text style={styles.textRename}>Rename</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    await themeControler.Delete(theme.id);
                    await RetriveThemes();
                  }}
                  style = {[styles.button, styles.buttonDelete]}
                >
                  <Text style={styles.textDelete}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>Nenhum tema encontrado</Text>
        )}
      </ScrollView>
    </View>
  );
}
