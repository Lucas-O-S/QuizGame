
import { DbHelper } from "../Utils/DbHelper";

class StandardDAO{
    
    dbName;

    constructor(tbName){
        this.dbName = tbName;
    }

    async Get(Id) {

        const connection = await DbHelper.GetConnection();

        const register = await connection.getAsync("select * from " + this.dbName  + " where Id = ?", [Id]);
       
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

        const register = await connection.getAsync("select * from " + this.dbName);
       
        await connection.closeAsync();

        if(register){
            return register;

        }
        else{
            return null
        }

    }


    async Insert(model){
        return null;
    }

    async Update(model){
        return null
    }

    async Delete(Id){
        
        const connection = await DbHelper.GetConnection();


        const query = "delete from " + this.dbName  + " where Id = ?";

        const result = await connection.runAsync(query, [Id]);

        await connection.closeAsync();

        return result.changes == 1;

    }




}