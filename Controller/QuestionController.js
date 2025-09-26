import QuestionModel from "../Models/QuestionModel";
import QuestionService from "../Service/QuestionService";

export default class QuestionController{
    
    #service

    constructor(){
        this.#service = new QuestionService();
    }

    async GetAll(){
        try{
            const questionList = await this.#service.GetAll();
            console.log(questionList.length);
            return questionList || [];
        }
        catch(error){
            alert("Erro ao obter questões: " + error.message);
            return [];
        }
    }

    async Insert(text, img64, themeId, type){
        try{
            console.log("AAAA")
            const model = new QuestionModel(null, text, null, img64, themeId, type);

            const result = await this.#service.Insert(model);
            return result;
        }
        catch(error){
            console.log("Erro ao criar questão: ", error);
            alert("Erro ao criar questão: " + error.message);
            return null;
        }
    }

    async Update(model){
        try{
            await this.#service.Update(model);
            console.log(model.id);
            return true;
        }
        catch(error){
            alert("Erro ao atualizar questão: " + error.message);
            return false;
        }
    }

    async Delete(id){
        try{
            await this.#service.Delete(id);
            return true;
        }
        catch(error){
            alert("Erro ao deletar questão: " + error.message);
            return false;
        }
    }


    async GetByThemeId(themeId){
        try {
            return await this.#service.GetByThemeId(themeId);
        } catch (error) {
            alert("Erro ao buscar questões por tema: " + error.message);
            return [];
        }
    }


    


}