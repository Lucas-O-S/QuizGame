
import { DbHelper } from "../Utils/DbHelper";

export class ThemeDao extends StandardDAO{
    
    
    constructor(){
        super("tbAnswer");
    }

    async Update(model){
        
        connection = DbHelper.GetConnection();

        query = "insert into " + dbName + " (text, right, questionId) values(?,?,?)  "

        const result = await connection.execAsync(query, [model.text, model.right, model.questionId])

        await connection.closeAsync();

        return result == 1;
    }

    async Update(model){
        
        connection = DbHelper.GetConnection();

        query = "update " + dbName + " set text = ?, right = ?  where id = ?"

        const result = await connection.execAsync(query, [model.text, model.right ,model.id])

        await connection.closeAsync();

        return result == 1;
    }



}