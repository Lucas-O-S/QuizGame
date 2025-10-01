import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Checkbox } from "react-native-paper";
import AnswerModel from "../Models/AnswerModel";
import styles from "../Styles/AnswerEditorStyles";

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
        <View style={styles.modalContainer}>
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

          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.cancelText}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={saveNewAnswer} style={[styles.button, styles.saveButton]}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}