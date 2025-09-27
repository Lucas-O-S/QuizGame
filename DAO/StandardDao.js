
import { DbHelper } from "../Utils/DbHelper";

class StandardDAO{
    
    dbName;

    constructor(tbName){
        this.dbName = tbName;
    }

    async GetById(Id) {

        const connection = await DbHelper.GetConnection();

        const register = await connection.getFirstAsync("select * from " + this.dbName  + " where Id = ?", [Id]);
       
        await connection.closeAsync();

        if(register){
            return register;

        }
        else{
            return null
        }

    }
    async GetAll(){
        const connection = await DbHelper.GetConnection();
        const registers = await connection.getAllAsync("SELECT * FROM " + this.dbName);
        
        await connection.closeAsync();
        return registers && registers.length > 0 ? registers : [];
    }



    async Insert(model){
        return null;
    }

    async Update(model){
        return null
    }


    async Delete(Id){
        const connection = await DbHelper.GetConnection();
        const query = "DELETE FROM " + this.dbName + " WHERE id = ?";
        const result = await connection.runAsync(query, [Id]);
        await connection.closeAsync();
        return result.changes === 1;
    }




}

export default StandardDAO;