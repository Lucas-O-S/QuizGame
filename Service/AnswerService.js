import {QuestionDao as AnswerDao} from "../DAO/AnswerDao"
import AnswerModel from "../Models/AnswerModel"

export default class QuestionService{

    #dao;

    QuestionService(){
        this.#dao = new AnswerDao;
    }

    
    async Get (id) {
        const register = await this.#dao.Get(id);
        
        if(!register) throw new error("Não foi encontrado no banco");
        
        const model = new AnswerModel(register.id, register.questionText, register.img, register.themeId);

        return model;



    }
    
    async GetAll(){

        const registers = await this.#dao.GetAll();

        
        let models = [];
        
        for(const register of registers){
            
            const model = new AnswerModel(register.id, register.questionText, register.img, register.themeId);

            models.push(model);

        }
        
        return models;

    }

    async Insert(model){
        const result = this.#dao.Insert(model);
        if(!result) throw new console.error("Náo foi possivel adicionar o Tema");
    }

    async Update(model){

        const result = this.#dao.Update(model)

        if(!result) throw new console.error("Náo foi possivel atualizar o Tema");

        return result == 1;

    }
    
    async Delete(id){

        const result = this.#dao.Delete(id);

        return result == 1;

    }

    async GetByQuestionId(questionId){

        const register = await this.#dao.GetByThemeId(questionId);
        
        if(!register) throw new error("Não foi encontrado no banco");
        
        const model = new AnswerModel(register.id, register.text, register.right, register.questionId);

        return model;


    }


}