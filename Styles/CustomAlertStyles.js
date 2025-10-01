import { StyleSheet } from 'react-native';
import Colors from "./Colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        padding: 24,
        borderRadius: 16,
        alignItems: "center",
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
        color: Colors.primary,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        marginBottom: 24,
        color: Colors.textPrimary,
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
        width: "100%",
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: Colors.primary,
    },
    confirmButton: {
        backgroundColor: Colors.secondary,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    cancelText: {
        color: Colors.surface,
    },
    confirmText: {
        color: Colors.surface,
    },
    });

export default styles;