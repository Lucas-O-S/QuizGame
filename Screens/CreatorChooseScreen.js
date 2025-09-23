import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import  ThemeControler  from "../Controller/ThemeController";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import InsertThemeComponent from "../Components/InsertThemeComponent.js";



export default function CreatorChooseScreen({navigation}){

    const [themeList, setThemeList] = useState([]);

    const themeControler = new ThemeControler();
    
    const [modalVisible, setModalVisible] = useState(false);


    async function RetriveThemes(){
        const list = await themeControler.GetAll()
        setThemeList(list)
    }


   useFocusEffect(
    useCallback(() => {
        async function fetchThemes() {
        await RetriveThemes();
        }
        fetchThemes();
    }, [])
    );

    return(
        <View>
            <Text>Choose One</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>+</Text>
            </TouchableOpacity>

            <InsertThemeComponent
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            <ScrollView>
                {themeList.length > 0 ? (
                    themeList.map((theme) => (
                        <TouchableOpacity key={theme.id}>
                            <Text>{theme.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>Nenhum tema encontrado</Text>
                )}
            </ScrollView>
        </View>

    )
}