import { StyleSheet } from 'react-native';
import Colors from "./Colors";

const GameScreenStyles = StyleSheet.create({
    container: { 
        padding: 20,
        backgroundColor: Colors.background,
        paddingTop: 65,
        flex: 1,
    },
    text: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginBottom: 20,
        marginTop: 10,
        color: Colors.textPrimary,
        backgroundColor: Colors.surface,
        fontSize: 16,
        fontWeight: "bold",
    },
    feedbackText: {
        fontSize: 16,
        marginTop: 20,
        alignSelf: "center",
        color: Colors.textPrimary,
    },
    answersContainer: { 
        marginTop: 20,
    },
    answerBox: {
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 6,
        marginBottom: 10,
        backgroundColor: Colors.surface,
        flexDirection: "row",
        alignItems: "center",
    },
    selectedAnswer: {
        backgroundColor: "#ece9fd",
        borderColor: Colors.secondary,
        borderWidth: 2,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    correctAnswer: {
        backgroundColor: "#e6f4ec",
        borderColor: "#28a745",
        borderWidth: 2,
    },
    wrongAnswer: {
        backgroundColor: "#fcebea",
        borderColor: "#dc3545",
        borderWidth: 2,
    },
    answerLabel: { 
        fontWeight: "bold", 
        color: Colors.textPrimary,
        marginRight: 10,
    },
    answerText: { 
        flexShrink: 1,
        color: Colors.textSecondary,
    },
    button: {
        backgroundColor: Colors.secondary,
        padding: 12,
        borderRadius: 6,
        marginTop: 35,
        alignItems: "center",
    },
    buttonText: { 
        color: Colors.surface, 
        fontWeight: "bold",
        fontSize: 16,
    },
    statusContainer: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginBottom: 15,
    },
    points: { 
        fontSize: 16, 
        fontWeight: "bold", 
        color: Colors.secondary,
    },
    errors: { 
        fontSize: 16, 
        fontWeight: "bold", 
        color: Colors.primary,
    },
    cancelButton: {
        backgroundColor: Colors.primaryDark,
        marginTop: 10,
    },
});

export default GameScreenStyles;