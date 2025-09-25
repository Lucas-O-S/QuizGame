import ThemeService from "../Service/ThemeService";
import AnswerModel from "../Models/AnswerModel"

export default class AnswerController{
    
    #service

    constructor(){
        this.#service = new ThemeService();
    }

    async GetAll(){
        try{
            
            const answerList = await this.#service.GetAll();


            console.log(answerList.length);

            return answerList || [];
            
        }
        catch(error){
            
            alert("Erro ao obter temas: " + error.message);       

        }
    }

    async Create(text, right, questionId){
        try{
            const model = new AnswerModel(null, themeName);

            await this.#service.Insert(model);
            
            console.log("asdf")

            return true;

        }
        catch(error){
            
            alert("Erro ao Criar tema: " + error.message);       

        }
    }

    async Update(model){
        try{
            await this.#service.Update(model);
            console.log(model.id)
            
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


    async GetByThemeId(themeId){
        
    }


    


}