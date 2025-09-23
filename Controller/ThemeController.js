
import { alert } from "react-native";
import  ThemeService  from "../Service/ThemeService";

export default class ThemeControler{

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
            
            alert("Erro ao obter temas: " + error.message);       

        }
    }



}