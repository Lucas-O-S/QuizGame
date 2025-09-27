import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";

export class AnswerDao extends StandardDAO{
    
    
    constructor(){
        super("tbAnswer");
    }

    async Insert(model){
        console.log([
            model.text,
            model.isRight,
            model.questionId,
            model.type
        ]);

        const connection = await DbHelper.GetConnection();
        const correctIsRight = model.isRight ? 1 : 0;

        // Usando runAsync que aceita placeholders
        const result = await connection.runAsync(
            `INSERT INTO ${this.dbName} (answer, isRight, type, questionId) VALUES (?, ?, ?, ?)`,
            [model.text, correctIsRight, model.type, model.questionId]
        );

        await connection.closeAsync();
        return result.changes > 0; // retorna true se inseriu algo
    }

    async Update(model){
        const connection = await DbHelper.GetConnection();
        const query = "update " + this.dbName + " set answer = ?, isRight = ?, type = ? where id = ?";
        const result = await connection.execAsync(query, [model.text, model.isRight, model.type, model.id]);
        await connection.closeAsync();
        return result == 1;
    }



}