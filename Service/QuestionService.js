import QuestionModel from "../Models/QuestionModel"
import {QuestionDao} from "../DAO/QuestionDao"

export default class QuestionService{

    #dao;

    constructor(){
        this.#dao = new QuestionDao();
    }


        async Get (id) {
            const register = await this.#dao.Get(id);
            if(!register) throw new error("Não foi encontrado no banco");
            const model = new QuestionModel(register.id, register.questionText, register.themeId);
            return model;
        }
    
        async GetAll(){
            const registers = await this.#dao.GetAll();
            let models = [];
            for(const register of registers){
                const model = new QuestionModel(register.id, register.questionText, register.themeId);
                models.push(model);
            }
            return models;
        }
    
        async Insert(model){
            console.log("Passou por service");
            const result = await this.#dao.Insert(model);
            if(!result) throw new console.error("Náo foi possivel adicionar o Tema");
            return result;
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

        async GetByThemeId(themeId){
            const register = await this.#dao.GetByThemeId(themeId);
            if(!register) throw new error("Não foi encontrado no banco");
            const model = new QuestionModel(register.id, register.questionText, register.themeId);
            return model;
        }


}