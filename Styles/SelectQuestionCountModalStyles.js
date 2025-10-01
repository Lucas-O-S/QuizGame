import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "85%",
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 24,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.textPrimary,
        marginBottom: 4,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: Colors.textPrimary,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 6,
    },
    cancel: {
        backgroundColor: Colors.secondaryLight,
    },
    confirm: {
        backgroundColor: Colors.primary,
    },
    cancelText: {
        color: Colors.surface,
        fontWeight: "600",
    },
    confirmText: {
        color: Colors.surface,
        fontWeight: "600",
    },
    });

export default styles;