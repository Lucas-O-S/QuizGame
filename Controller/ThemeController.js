
import { Alert } from "react-native";
import { ThemeService } from "../Service/ThemeService";

export class ThemeControler{

    #service

    constructor(){
        this.#service = new ThemeService();
    }

    async GetAll(){
        try{
            
            themeList = await this.#service.GetAll();

            return themeList;
        }
        catch(error){
            
            Alert("Erro ao obter temas: " + error.message);       

        }
    }



}