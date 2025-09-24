import { StyleSheet } from "react-native";
import BaseStyles from "./BaseStyles";
import Colors from "./Colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.secondary,
        alignSelf: "center",
        marginTop: 70,
        fontFamily: "monospace",
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 18,
        color: Colors.textPrimary,
    },
    button: {
        backgroundColor: 'rgba(72, 87, 145, 0.5)',
        padding: 10,
        borderRadius: 16,
        marginVertical: 8,
        height: 100,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "blue",
        fontSize: 18,
    },
});

export default styles;
