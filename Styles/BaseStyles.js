import { StyleSheet } from "react-native";
import Colors from "./Colors";

const BaseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    text: {
        color: Colors.textPrimary,
    },
    button: {
        backgroundColor: Colors.primary,
    },
});

export default BaseStyles;