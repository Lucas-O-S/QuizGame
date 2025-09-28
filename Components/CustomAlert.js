import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

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
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={[styles.buttonText, { color: "#333" }]}>{cancelText}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, styles.confirm]} onPress={onConfirm}>
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: "center",
    color: "#555",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  confirm: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
