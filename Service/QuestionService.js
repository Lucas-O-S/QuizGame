import QuestionModel from "../Models/QuestionModel"
import {QuestionDao} from "../DAO/QuestionDao"

export default class QuestionService{

    #dao;

    constructor(){
        this.#dao = new QuestionDao();
    }


        async GetById (id) {
            const register = await this.#dao.GetById(id);
            console.log(register)

            if(!register) throw new error("Não foi encontrado no banco");
            
            const model = new QuestionModel(register.id, register.questionText, register.themeId, register.type);
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
            const result = await this.#dao.Insert(model);
            if(!result) throw new console.error("Náo foi possivel adicionar a questão");
            return result;
        }
    
        async Update(model){
            const result = this.#dao.Update(model)
            if(!result) throw new console.error("Náo foi possivel atualizar a questão");
            return result == 1;
        }
    
        async Delete(id){
            const result = this.#dao.Delete(id);
            return result == 1;
        }

        async GetByThemeId(themeId){
            
            const registers = await this.#dao.GetByThemeId(themeId);
            console.log(registers)
            let models = [];

            for(const register of registers){

                const model = new QuestionModel(register.id, register.questionText, register.themeId, register.type);
                
                models.push(model);
            
            }
            return models;
        
        }



}