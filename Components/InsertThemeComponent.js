import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import ThemeControler from "../Controller/ThemeController";

export default function InsertThemeComponent({ visible, onClose, onSaveSuccess, editingTheme }) {
  const [themeName, setThemeName] = useState("");
  const themeControler = new ThemeControler();

  useEffect(() => {
    if (visible) {
      setThemeName(editingTheme?.name || "");
    }
  }, [visible, editingTheme]);

  async function saveNewTheme() {
    let result = false;

    if (editingTheme) {
      editingTheme.name = themeName;
      result = await themeControler.Update(editingTheme);
    } else {
      result = await themeControler.Create(themeName);
    }

    if (result === true) {
      Alert.alert("Salvo com sucesso");
      setThemeName("");
      onSaveSuccess?.();
      onClose();
    }
  }

 return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000000aa' }}>
        <View style={{ backgroundColor:'white', padding:20, borderRadius:10 }}>
          <Text>{editingTheme ? "Renomear Tema" : "Criar Novo Tema"}</Text>

          <Text>Nome</Text>
          <TextInput
            value={themeName}
            onChangeText={setThemeName}
          />

          <TouchableOpacity onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={saveNewTheme}>
            <Text>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
