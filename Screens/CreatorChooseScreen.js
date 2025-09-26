import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import ThemeControler from "../Controller/ThemeController";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import InsertThemeComponent from "../Components/InsertThemeComponent.js";

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Choose One</Text>

      <TouchableOpacity onPress={openCreateModal} style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, color: 'blue' }}>+ Novo Tema</Text>
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
        {  themeList.length > 0 ? (
          themeList.map((theme) => (
            <View key={theme.id} style={{ marginBottom: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate("ChooseQuestionEditorScreen", {theme})}>
                <Text style={{ fontSize: 18 }}>{theme.name }</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await themeControler.Delete(theme.id);
                  await RetriveThemes();
                }}
              >
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openEditModal(theme)}>
                <Text style={{ color: 'green' }}>Rename</Text>
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
