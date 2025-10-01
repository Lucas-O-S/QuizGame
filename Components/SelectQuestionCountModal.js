import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "../Styles/SelectQuestionCountModalStyles";

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
        <View style={styles.modal}>
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
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirm]} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}