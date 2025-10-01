import { StyleSheet } from "react-native";
import Colors from "./Colors";

const GameEndScreenStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
        color: Colors.textPrimary,
    },
    statsContainer: {
        width: "100%",
        padding: 20,
        backgroundColor: Colors.surface,
        borderRadius: 10,
        marginBottom: 30,
        shadowColor: Colors.shadowColor,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    statText: {
        fontSize: 18,
        marginBottom: 10,
        color: Colors.textSecondary,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: Colors.surface,
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default GameEndScreenStyles;