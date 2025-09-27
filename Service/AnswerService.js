import {AnswerDao} from "../DAO/AnswerDao"
import AnswerModel from "../Models/AnswerModel"

export default class AnswerService{

    #dao;

    constructor(){
        this.#dao = new AnswerDao();
    }

    async Get (id) {
        const register = await this.#dao.GetById(id);
        
        if(!register) throw new error("Não foi encontrado no banco");
        
        const model = new AnswerModel(register.id, register.questionText, register.img, register.themeId, register.type);

        return model;

    }
    
    async GetAll(){

        const registers = await this.#dao.GetAll();

        
        let models = [];
        
        for(const register of registers){
            
            const model = new AnswerModel(register.id, register.questionText, register.img, register.themeId, register.type);

            models.push(model);

        }
        
        return models;

    }

    async Insert(model){

        const result = await this.#dao.Insert(model);
        if(!result) throw new Error("Não foi possível adicionar a resposta");
        return result;
    }

    async Update(model){


        const result = await this.#dao.Update(model);
        if(!result) throw new Error("Não foi possível atualizar a resposta");
        return result == 1;
    }
    
    async Delete(id){

        const result = await this.#dao.Delete(id);

        return result == 1;

    }

    async GetByQuestionIdAndType(questionId,type){
        const registers = await this.#dao.GetByQuestionIdAndType(questionId, type);
        
        if(!registers) throw new error("Não foi encontrado no banco");
                
        let models = [];
        
        for(const register of registers){
            console.log(register)
            const model = new AnswerModel(register.id, register.answer, register.isRight==1 ? true : false , register.questionId, register.type);

            models.push(model);

        }

        return models;


    }


}