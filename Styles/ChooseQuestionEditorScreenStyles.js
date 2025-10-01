import { StyleSheet } from 'react-native';
import Colors from './Colors';

const ChooseQuestionEditorScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 16,
        marginTop: 50,
        textAlign: 'center',
    },
    newQuestionButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
        alignSelf: "flex-start",
        minWidth: 160,
    },
    newQuestionButtonText: {
        color: Colors.surface,
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        color: Colors.textPrimary,
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    divider: {
        width: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 12,
        alignSelf: 'stretch',
        borderRadius: 1,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    deleteText: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '600',
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 40,
    },
});

export default ChooseQuestionEditorScreenStyles;