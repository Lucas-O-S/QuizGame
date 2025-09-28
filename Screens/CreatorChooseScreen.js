import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import ThemeController from "../Controller/ThemeController";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import InsertThemeComponent from "../Components/InsertThemeComponent.js";
import CustomAlert from "../Components/CustomAlert.js"; // modal customizado
import styles from "../Styles/CreatorChooseScreenStyles.js";

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
        {themeList.length > 0 ? (
          themeList.map((theme) => (
            <View key={theme.id} style={styles.themeItem}>
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
                  <Text style={styles.textRename}>Rename</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => CallDelete(theme.id)}
                  style={[styles.button, styles.buttonDelete]}
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
