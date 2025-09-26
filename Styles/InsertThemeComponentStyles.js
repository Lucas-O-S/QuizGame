import { StyleSheet } from "react-native";
import BaseStyles from "./BaseStyles";
import Colors from "./Colors";

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000aa",
    },
    modalContainer: {
        backgroundColor: "#fffbfbff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    label: {
        marginBottom: 5,
        fontWeight: "600",
    },
    input: {
        borderWidth: 1,
        borderColor: "#858585ff",
        borderRadius: 6,
        padding: 10,
        marginBottom: 20,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: Colors.primary,
    },
    cancelText: {
        color: "#001438ff",
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: "#75c978ff",
    },
    saveText: {
        color: "#084e09ff",
        fontWeight: "600",
    },
});

export default styles;
