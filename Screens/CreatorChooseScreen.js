import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import  ThemeControler  from "../Controller/ThemeController";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";




export default function CreatorChooseScreen({navigation}){

    const [themeList, setThemeList] = useState([]);

    const themeControler = new ThemeControler();
    

    async function RetriveThemes(){
        list = await themeControler.GetAll()
        setThemeList(list)
    }


    useFocusEffect(
        useCallback(() => {
            RetriveThemes();
        },[])

    );

    return(
        <View>
            <Text>Choose One</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CreateTheme")}>
                <Text>+</Text>
            </TouchableOpacity>

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