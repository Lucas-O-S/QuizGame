import { StyleSheet } from "react-native";
import BaseStyles from "./BaseStyles";
import Colors from "./Colors";

const styles = StyleSheet.create({
    container: {
        ...BaseStyles.container,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.secondary,
        alignSelf: "center",
        marginBottom: 20,
        fontFamily: "monospace",
        textTransform: "uppercase",
    },
    text: {
        fontSize: 18,
        color: Colors.textPrimary,
    },
    textDelete: {
        color: "#cc0000",
        fontSize: 13,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    textRename: {
        color: "#000766ff",
        fontSize: 13,
        textTransform: "uppercase",
        
    },
    buttonText: {
        color: "#5b7a9eff",
        fontSize: 18,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    buttonDelete: {
        backgroundColor: "#f7c1c1ff",
    },
    buttonRename: {
        backgroundColor: "#ababebff",
    },
    themeItem: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: "#e4e4e4ff",
        borderRadius: 10,
        backgroundColor: "#e9e9e9ff",
    },
    themeName: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default styles;
