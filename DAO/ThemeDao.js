
import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";

export class ThemeDao extends StandardDAO{
    
    
    constructor(){
        super("tbTheme");
    }

    async Insert(model){
        
        const connection = await DbHelper.GetConnection();
        
        const query = "insert into " + this.dbName + " (name) values(?)  "
        
        const result = await connection.runAsync(query, [model.name])
        
        
        await connection.closeAsync();
        
        return result.changes == 1;
    }

    async Update(model){
        
        const connection = await DbHelper.GetConnection();
        const query = "update " + this.dbName + " set name = ? where id = ?"


        const result = await connection.runAsync(query, [model.name, model.id])

        await connection.closeAsync();


        return result.changes == 1;

    }



}