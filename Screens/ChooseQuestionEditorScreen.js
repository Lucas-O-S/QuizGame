
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

export default function ChooseQuestionEditorScreen({ navigation, route }) {

    const {theme} = route.params;
    

    return(
        <Text>{theme.name}</Text>
    )
}