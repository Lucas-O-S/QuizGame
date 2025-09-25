import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import ThemeControler from "../Controller/ThemeController";
import { Checkbox } from 'react-native-paper';


export default function InsertThemeComponent({ visible, onClose, onSaveSuccess, editingAnswer }) {
  const [themeName, setThemeName] = useState("");
  const themeControler = new ThemeControler();

  useEffect(() => {
    if (visible) {
      saveNewAnswer();
    }
  }, [visible, editingAnswer]);

  async function saveNewAnswer() {

  }

 return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000000aa' }}>
        <View style={{ backgroundColor:'white', padding:20, borderRadius:10 }}>
          <Text>{"Alterar Resposta"}</Text>

        <View>
            <Text>Nome</Text>
            <TextInput
              value={themeName}
              onChangeText={setThemeName}
            />
        </View>

        <View>
              <Checkbox.Item label="Item" status="checked" />
        </View>

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
