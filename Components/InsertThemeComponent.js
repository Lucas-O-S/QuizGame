import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import ThemeControler from "../Controller/ThemeController";
import styles from "../Styles/InsertThemeComponentStyles.js"

export default function InsertThemeComponent({ visible, onClose, onSaveSuccess, editingTheme, modalStyle }) {
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
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalContainer, modalStyle]}>
          <Text style={styles.title}>
            {editingTheme ? "Renomear Tema" : "Criar Novo Tema"}
          </Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={themeName}
            onChangeText={setThemeName}
            placeholder="Digite o nome do tema"
            style={styles.input}
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.cancelText}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={saveNewTheme} style={[styles.button, styles.saveButton]}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}