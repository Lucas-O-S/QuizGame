
import { DbHelper } from "../Utils/DbHelper";

class StandardDAO{
    

    dbName;

    async Get(Id) {

        connection = await DbHelper.GetConnection();

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

        connection = await DbHelper.GetConnection();

        const register = await connection.getAsync("select * from " + this.dbName);
       
        await connection.closeAsync();

        if(register){
            return register;

        }
        else{
            return null
        }

    }


    async Insert(){

    }

    async Update(){

    }

    async Delete(Id){
        const query = "delete from " + this.dbName  + " where Id = " + Id;

    }




}