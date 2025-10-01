import { StyleSheet } from 'react-native';
import Colors from "./Colors";

const EditQuestionScreenStyles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: Colors.background,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.textPrimary,
        marginBottom: 20,
        textAlign: "center",
        marginTop: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
        color: Colors.textPrimary,
        marginTop: 20,
    },
    answersContainer: {
        marginTop: 20,
    },
    answerBox: {
        padding: 14,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: Colors.surface,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    answerLabel: {
        fontWeight: "600",
        fontSize: 15,
        color: Colors.secondary,
    },
    answerText: {
        marginTop: 4,
        color: Colors.textSecondary,
        fontSize: 14,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.5,
    },
    radioGroup: {
        backgroundColor: Colors.surface,
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 16,
    },
    radioItem: {
        paddingHorizontal: 8,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginHorizontal: 12,
    },
});

export default EditQuestionScreenStyles;