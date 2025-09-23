
import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";


export class ThemeDao extends StandardDAO{
    
    
    constructor(){
        super("tbQuestion");
    }

    async Insert(model){
        
        const connection = await DbHelper.GetConnection();

        const query = "insert into " + this.dbName + " (text, img, themeId) values(?,?,?)  "

        const result = await connection.execAsync(query, [model.text, model.imgByte, model.themeId])

        await connection.closeAsync();

        return result == 1;
    }

    async Update(model){
        
        const connection = DbHelper.GetConnection();

        const query = "update " + this.dbName + " set name = ?, img = ?  where id = ?"

        const result = await connection.execAsync(query, [model.text, model.imgByte ,model.id])

        await connection.closeAsync();

        return result == 1;
    }



}