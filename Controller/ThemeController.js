
import { Alert } from "react-native";
import  ThemeService  from "../Service/ThemeService";
import ThemeModel from "../Models/ThemeModel";

export default class ThemeControler{

    #service

    constructor(){
        this.#service = new ThemeService();
    }

    async GetAll(){
        try{
            
            const themeList = await this.#service.GetAll();

            console.log(themeList);

            return themeList || [];
            
        }
        catch(error){
            
            Alert("Erro ao obter temas: " + error.message);       

        }
    }

    async Create(themeName){
        try{
            
            const model = new ThemeModel("", themeName);
            
            result = await this.#service.Insert(model);

            return true;

        }
        catch(error){
            
            Alert("Erro ao Criar tema: " + error.message);       

        }
    }



}