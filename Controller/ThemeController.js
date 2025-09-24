
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

            return themeList || [];
            
        }
        catch(error){
            
            alert("Erro ao obter temas: " + error.message);       

        }
    }

    async Create(themeName){
        try{
            
            const model = new ThemeModel("", themeName);
                    console.log("asdf")

            await this.#service.Insert(model);
            
            console.log("asdf")

            return true;

        }
        catch(error){
            
            alert("Erro ao Criar tema: " + error.message);       

        }
    }

    async Update(theme){
        try{
            
            const model = new ThemeModel(theme.id, theme.name);
            console.log(model.id)
            await this.#service.Update(model);
            

            return true;

        }
        catch(error){
            
            alert("Erro ao atualizar tema: " + error.message);       

        }
    }

    async Delete(id){
        try{
            await this.#service.Delete(id)
        }
        catch(error){
            alert("Erro ao deletar: " + error)
        }
        
        
    }



}