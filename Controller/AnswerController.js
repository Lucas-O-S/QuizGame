import ThemeService from "../Service/ThemeService";

export default class AnswerController{
    
    #service

    constructor(){
        this.#service = new ThemeService();
    }

    async GetAll(){
        try{
            
            const themeList = await this.#service.GetAll();


            console.log(themeList.length);

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