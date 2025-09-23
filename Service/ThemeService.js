
import ThemeModel from "../Models/ThemeModel"
import { ThemeDao } from "../DAO/ThemeDao"

export default class ThemeService{

    #dao;


    constructor(){
        this.#dao = new ThemeDao();
    }


    async Get (id) {
        const register = await this.#dao.Get(id);
        
        if(!register) throw new error("Não foi encontrado no banco");
        
        const model = new ThemeModel(register.id, register.name);

        return model;



    }

    async GetAll(){

        const registers = await this.#dao.GetAll();

        let models = [];

        for(const register of registers){
            
            const model = new ThemeModel(register.id, register.name);


            models.push(model);

        }

    }

    async Insert(model){

        const result = this.#dao.Insert(model);

        if(!result) throw new console.error("Náo foi possivel adicionar o Tema");


    }

    async Update(model){

        const result = this.#dao.Update(model)

        if(!result) throw new console.error("Náo foi possivel atualizar o Tema");

    }

    async Delete(Id){

        const result = this.#dao.Delete(id);

    }
    
}