import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function SelectQuestionCountModal({ visible, maxQuestions, onClose, onConfirm }) {
  const [inputValue, setInputValue] = useState("1");

  useEffect(() => {
    if (visible) setInputValue("1"); // reset ao abrir
  }, [visible]);

  function handleConfirm() {
    const num = parseInt(inputValue);
    if (isNaN(num) || num <= 0 || num > maxQuestions) {
      alert(`Informe um número entre 1 e ${maxQuestions}`);
      return;
    }
    onConfirm(num);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>Quantidade de perguntas</Text>
          <Text style={styles.subtitle}>Máximo disponível: {maxQuestions}</Text>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirm]} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subtitle: { fontSize: 14, marginBottom: 15, color: "#555" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 20,
    textAlign: "center",
  },
  buttons: { flexDirection: "row", justifyContent: "flex-end", width: "100%" },
  button: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, marginLeft: 10 },
  cancel: { backgroundColor: "#ccc" },
  confirm: { backgroundColor: "#007bff" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
