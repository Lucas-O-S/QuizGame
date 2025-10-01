import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import ThemeController from "../Controller/ThemeController";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import InsertThemeComponent from "../Components/InsertThemeComponent.js";
import CustomAlert from "../Components/CustomAlert.js"; // modal customizado
import styles from "../Styles/CreatorChooseScreenStyles.js";
import { FontAwesome5 } from '@expo/vector-icons';

export default function CreatorChooseScreen({ navigation }) {
  const [themeList, setThemeList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [themeToDelete, setThemeToDelete] = useState(null);

  const themeControler = new ThemeController();

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
    setEditingTheme(null);
    setModalVisible(true);
  }

  function openEditModal(theme) {
    setEditingTheme(theme);
    setModalVisible(true);
  }

  function CallDelete(id) {
    setThemeToDelete(id);
    setAlertVisible(true);
  }

  async function handleConfirmDelete() {
    if (themeToDelete !== null) {
      await themeControler.Delete(themeToDelete);
      await RetriveThemes();
      setThemeToDelete(null);
    }
    setAlertVisible(false);
  }

  return (
    <View style={styles.container}>

    <View style={styles.backgroundGrid}>
      {Array.from({ length: 50 }).map((_, i) => (
        <View key={`h-${i}`} style={[styles.horizontalLine, { top: i * 40 }]} />
      ))}

      {Array.from({ length: 20 }).map((_, i) => (
        <View key={`v-${i}`} style={[styles.verticalLine, { left: i * 40 }]} />
      ))}
    </View>

      <Text style={styles.title}>Criação e Edição de Tema</Text>

      <TouchableOpacity
      onPress={openCreateModal}
      style={styles.newThemeButton}>
        <Text style={styles.newThemeButtonText}>+ Novo Tema</Text>
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {themeList.length > 0 ? (
          themeList.map((theme) => (
            <View key={theme.id} style={styles.themeCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ChooseQuestionEditorScreen", { theme })
                }
              >
                <Text style={styles.themeName}>{theme.name}</Text>
              </TouchableOpacity>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => openEditModal(theme)}
                  style={[styles.button, styles.buttonRename]}
                >
                  <FontAwesome5 name="pen" size={14} color="#000766" style={{ marginRight: 6 }} />
                  <Text style={styles.textRename}>Renomear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => CallDelete(theme.id)}
                  style={[styles.button, styles.buttonDelete]}
                >
                  <FontAwesome5 name="trash" size={14} color="#cc0000" style={{ marginRight: 6 }} />
                  <Text style={styles.textDelete}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum tema encontrado</Text>
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
