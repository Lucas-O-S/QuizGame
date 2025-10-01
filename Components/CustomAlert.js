import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "../Styles/CustomAlertStyles";

export default function CustomAlert({ visible, title, message, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancelar" }) {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
    >
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        {message && <Text style={styles.message}>{message}</Text>}
        
        <View style={[styles.buttons, onCancel ? {} : { justifyContent: "center" }]}>
          {onCancel && (
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={[styles.buttonText, styles.cancelText]}>{cancelText}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
            <Text style={[styles.buttonText, styles.confirmText]}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}