import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";

export class AnswerDao extends StandardDAO{
    
    
    constructor(){
        super("tbAnswer");
    }

    async Insert(model){
        const connection = await DbHelper.GetConnection();
        const query = "insert into " + this.dbName + " (text, isRight, type, questionId) values(?,?,?,?)";
        const result = await connection.execAsync(query, [model.text, model.right, model.type, model.questionId]);
        await connection.closeAsync();
        return result == 1;
    }

    async Update(model){
        const connection = await DbHelper.GetConnection();
        const query = "update " + this.dbName + " set text = ?, isRight = ?, type = ? where id = ?";
        const result = await connection.execAsync(query, [model.text, model.isRight, model.type, model.id]);
        await connection.closeAsync();
        return result == 1;
    }



}