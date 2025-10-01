import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        backgroundColor: Colors.surface ?? "#fff",
        padding: 24,
        borderRadius: 16,
        width: "85%",
        shadowColor: Colors.shadowColor ?? "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: Colors.primary,
    },
    label: {
        marginBottom: 8,
        fontWeight: "600",
        color: Colors.textPrimary,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border ?? "#ccc",
        borderRadius: 10,
        padding: 14,
        marginBottom: 24,
        backgroundColor: Colors.surface,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginHorizontal: 6,
        shadowColor: Colors.primaryDark ?? "#357ABD",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 4,
    },
    cancelButton: {
        backgroundColor: Colors.primary,
    },
    cancelText: {
        color: Colors.surface,
        fontWeight: "700",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: Colors.secondary,
    },
    saveText: {
        color: Colors.surface,
        fontWeight: "700",
        fontSize: 16,
    },
});

export default styles;