import { StyleSheet } from 'react-native';
import Colors from './Colors';

const ChooseScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 20,
        marginTop: 50,
        textAlign: 'center',
    },
    scrollContainer: {
        paddingBottom: 100,
        paddingTop: 20,
    },
    themeItem: {
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
    },
    themeName: {
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 40,
    },
    backgroundGrid: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: Colors.background
    },
    horizontalLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
});

export default ChooseScreenStyles;