import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";

export class AnswerDao extends StandardDAO{
    
    
    constructor(){
        super("tbAnswer");
    }

    async Insert(model){


        const connection = await DbHelper.GetConnection();
        const correctIsRight = model.isRight ? 1 : 0;

        const query = `INSERT INTO ${this.dbName} (answer, isRight, type, questionId) VALUES (?, ?, ?, ?)`;

        const result = await connection.runAsync(query, [model.text, correctIsRight, model.type, model.questionId]);

        await connection.closeAsync();
        return result.changes > 0;
    }

    async Update(model){
        const connection = await DbHelper.GetConnection();
        const query = "update " + this.dbName + " set answer = ?, isRight = ?, type = ? where id = ?";
        const result = await connection.execAsync(query, [model.text, model.isRight, model.type, model.id]);
        await connection.closeAsync();
        return result == 1;
    }

    async GetByQuestionIdAndType(questionId, type) {
        console.log("Chegou a getbyquestion")
        const connection = await DbHelper.GetConnection();
        console.log("QuestionId envidado :" + questionId)
        console.log("Type envidado: " + type)
        const register = await connection.getAllAsync(
            "SELECT * FROM " + this.dbName + " WHERE questionId = ? AND type = ?", [questionId, type]   
        );

        await connection.closeAsync();
        return register || null;
    }



}