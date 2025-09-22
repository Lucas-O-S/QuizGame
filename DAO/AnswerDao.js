
import { DbHelper } from "../Utils/DbHelper";

export class ThemeDao extends StandardDAO{
    
    
    constructor(){
        super("tbAnswer");
    }

    async Insert(model){
        
        const connection = await DbHelper.GetConnection();

        const query = "insert into " + this.dbName + " (text, right, questionId) values(?,?,?)  "

        const result = await connection.execAsync(query, [model.text, model.right, model.questionId])

        await connection.closeAsync();

        return result == 1;
    }

    async Update(model){
        
        const connection = await DbHelper.GetConnection();

        const query = "update " + this.dbName + " set text = ?, right = ?  where id = ?"

        const result = await connection.execAsync(query, [model.text, model.right ,model.id])

        await connection.closeAsync();

        return result == 1;
    }



}