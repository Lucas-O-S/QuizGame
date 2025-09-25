import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { Checkbox } from "react-native-paper";

export default function AnswerEditor({
  visible,
  onClose,
  onSaveSuccess,
  editingAnswer,
}) {
  const [answerText, setAnswerText] = useState("");
  const [right, setRight] = useState(false);

  useEffect(() => {
    if (visible && editingAnswer) {
      // Se estiver editando, carregar o conteúdo da resposta
      setAnswerText(editingAnswer.text || "");
      setRight(editingAnswer.right || false);
    } else if (visible) {
      // Se for nova resposta
      setAnswerText("");
      setRight(false);
    }
  }, [visible, editingAnswer]);

  const saveNewAnswer = () => {
    if (!answerText.trim()) {
      Alert.alert("Erro", "A resposta não pode ser vazia.");
      return;
    }

    // Envia os dados para o componente pai
    if (onSaveSuccess) {
      onSaveSuccess({
        text: answerText,
        right: right,
      });
    }

    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Alterar Resposta</Text>

          <Text style={styles.label}>Texto da resposta</Text>
          <TextInput
            value={answerText}
            onChangeText={setAnswerText}
            style={styles.input}
            placeholder="Digite a resposta..."
          />

          <Checkbox.Item
            label="É a resposta correta?"
            status={right ? "checked" : "unchecked"}
            onPress={() => setRight(!right)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={saveNewAnswer} style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
