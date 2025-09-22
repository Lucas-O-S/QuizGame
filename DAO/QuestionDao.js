
import { DbHelper } from "../Utils/DbHelper";

export class ThemeDao extends StandardDAO{
    
    
    constructor(){
        super("tbQuestion");
    }

    async Update(model){
        
        connection = DbHelper.GetConnection();

        query = "insert into " + dbName + " (text, img, themeId) values(?,?,?)  "

        const result = await connection.execAsync(query, [model.text, model.imgByte, model.themeId])

        await connection.closeAsync();

        return result == 1;
    }

    async Update(model){
        
        connection = DbHelper.GetConnection();

        query = "update " + dbName + " set name = ?, img = ?  where id = ?"

        const result = await connection.execAsync(query, [model.text, model.imgByte ,model.id])

        await connection.closeAsync();

        return result == 1;
    }



}