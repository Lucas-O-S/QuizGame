import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000088",
    },
    modalContainer: {
        backgroundColor: Colors.surface,
        padding: 24,
        borderRadius: 16,
        width: "90%",
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.primary,
        marginBottom: 12,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    checkboxLabel: {
        fontSize: 16,
        color: Colors.textPrimary,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: Colors.secondary,
    },
    cancelText: {
        color: Colors.surface,
        fontWeight: "600",
        fontSize: 15,
    },
    saveButton: {
        backgroundColor: Colors.primary,
    },
    saveText: {
        color: Colors.surface,
        fontWeight: "600",
        fontSize: 15,
    },
});


export default styles;