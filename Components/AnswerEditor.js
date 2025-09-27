import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import AnswerModel from "../Models/AnswerModel";

export default function AnswerEditor({ visible, onClose, onSaveSuccess, editingAnswer }) {
  const [answerText, setAnswerText] = useState("");
  const [isRight, setIsRight] = useState(false);

  // Sempre atualiza quando o modal abre ou o editingAnswer muda
  useEffect(() => {
    if (visible && editingAnswer instanceof AnswerModel) {
      setAnswerText(editingAnswer.text ?? "");
      setIsRight(editingAnswer.isRight ?? false); // pega o valor do objeto original
    } else if (visible) {
      setAnswerText("");
      setIsRight(false);
    }
  }, [visible, editingAnswer]);

  const saveNewAnswer = () => {
    // Cria um novo objeto copiando todos os campos do original
    const newAnswer = new AnswerModel(
      editingAnswer?.id ?? null,
      answerText,           // texto pode ficar vazio
      isRight,              // salva o valor correto
      editingAnswer?.questionId ?? null,
      editingAnswer?.type ?? null
    );

    if (onSaveSuccess) onSaveSuccess(newAnswer);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Alterar Resposta</Text>

          <Text style={styles.label}>Texto da resposta</Text>
          <TextInput
            value={editingAnswer.type === "TrueFalse"
              ? (answerText === "Verdadeiro" ? "Verdadeiro" : "Falso")
              : answerText}
            onChangeText={setAnswerText}
            editable={editingAnswer.type !== "TrueFalse"}
            placeholder="Digite a resposta"
            style={styles.input}
          />

          <Checkbox.Item
            label="É a resposta correta?"
            status={isRight ? "checked" : "unchecked"}
            onPress={() => setIsRight(prev => !prev)}
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
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000aa" },
  modalBox: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%" },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  label: { marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginTop: 5, marginBottom: 15 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  button: { backgroundColor: "#007bff", padding: 10, borderRadius: 6 },
  buttonText: { color: "white", fontWeight: "bold" },
});
