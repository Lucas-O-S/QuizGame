import AnswerService from "../Service/AnswerService";
import AnswerModel from "../Models/AnswerModel";

export default class AnswerController{
    #service;

    constructor(){
        this.#service = new AnswerService();
    }

    async GetAll(){
        try{
            const answerList = await this.#service.GetAll();
            console.log(answerList.length);
            return answerList || [];
        }
        catch(error){
            alert("Erro ao obter respostas: " + error.message);
            return [];
        }
    }

    async Insert(text, isRight, type, questionId){
        try{
            const model = new AnswerModel(null, text, isRight, questionId, type);

            await this.#service.Insert(model);
            return true;
        }
        catch(error){
            alert("Erro ao criar resposta: " + error.message);
            return false;
        }
    }

    async Update(model){
        try{
            await this.#service.Update(model);
            console.log(model.id);
            return true;
        }
        catch(error){
            alert("Erro ao atualizar resposta: " + error.message);
            return false;
        }
    }

    async Delete(id){
        try{
            await this.#service.Delete(id);
            return true;
        }
        catch(error){
            alert("Erro ao deletar resposta: " + error.message);
            return false;
        }
    }

}