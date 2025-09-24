import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import QuestionController from "../Controller/QuestionController";
import { useCallback, useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export default function EditQuestionScreen({ navigation, route }) {
  const questionController = new QuestionController();

  const [questionName, setQuestionName] = useState("");
  const [imageUri, setImageUri] = useState(null);

  useFocusEffect(
    useCallback(() => {
      // Lógica para carregar dados existentes se necessário
    }, [])
  );

  const handleSelectImage = async () => {
    // Solicita permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permissão para acessar a galeria foi negada.');
      return;
    }

    // Abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Verifica se o usuário escolheu uma imagem
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log("Imagem selecionada:", uri); // Debug
      setImageUri(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        value={questionName}
        onChangeText={setQuestionName}
        placeholder="Digite a pergunta"
        style={styles.input}
      />

      {/* Quadro clicável para selecionar imagem */}
      <TouchableOpacity style={styles.imageBox} onPress={handleSelectImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Toque para selecionar imagem</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  imageBox: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  placeholderText: {
    color: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
