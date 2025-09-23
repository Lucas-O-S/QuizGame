import { useCallback, useState } from "react";
import { Modal, View, Text, TouchableOpacity,TextInput } from 'react-native';
import  ThemeControler  from "../Controller/ThemeController";

export default function InsertThemeComponent({ visible, onClose }) {
  
  const [themeName, setThemeName] = useState("");
  
  const themeControler = new ThemeControler();

  async function saveNewTheme(){
    const result = await themeControler.Create(themeName);
    console.log(result);
    alert("Salvo com sucesso")
    if (result === true) {
      setThemeName("")
      onClose();
    };
    console.log("Não foi");
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000000aa' }}>
        <View style={{ backgroundColor:'white', padding:20, borderRadius:10 }}>
          <Text>Crie um novo tema</Text>
          
          <View>

            <Text>Nome</Text>

            <TextInput
              value = {themeName}
              onChangeText = {setThemeName}
            />

          </View>

          <View>
            <TouchableOpacity 
              onPress={() => onClose()}
            >
              <Text>Fechar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => saveNewTheme()}
            >
              <Text>Salvar</Text>
            </TouchableOpacity>
            

          </View>

        </View>
      </View>
    </Modal>
  );
}
