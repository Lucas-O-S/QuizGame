import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "65%",
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 20,
    },
    bg: {
        flex: 1,
        backgroundColor: "#ffe6e6ff",
        alignContent: "center"
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: Colors.secondary,
        alignSelf: "center",
        marginTop: 70,
        fontFamily: "monospace",
        textTransform: 'uppercase',
    },
    button1: {
        backgroundColor: 'rgba(72, 87, 145, 0.5)',
        padding: 10,
        borderRadius: 16,
        marginVertical: 8,
        height: 100,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    button2: {
        backgroundColor: 'rgba(85, 130, 156, 0.5)',
        padding: 10,
        borderRadius: 16,
        marginVertical: 8,
        height: 100,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#f1f1f1ff",
        fontSize: 23,
        fontFamily: "monospace",
        textTransform: 'uppercase',
        fontWeight: "bold",
    },
});

export default styles;
