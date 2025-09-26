
import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";


export class QuestionDao extends StandardDAO{
    
    
    constructor(){
        super("tbQuestion");
    }

    async Insert(model){
        
        console.log(model.text)

        const connection = await DbHelper.GetConnection();
        
        const query = "insert into " + this.dbName + " (questionText, img, ThemeId, type) values(?,?,?,?)";
        
        const result = await connection.runAsync(query, [ model.text, model.imgByte, model.themeId, model.type]);

        await connection.closeAsync();

        return result.lastInsertRowId;
    }

    async Update(model){
        const connection = await DbHelper.GetConnection();
        const query = "update " + this.dbName + " set questionText = ?, img = ? where id = ?";
        const result = await connection.execAsync(query, [model.text, model.imgByte, model.id]);
        await connection.closeAsync();
        return result == 1;
    }

    async GetByThemeId(ThemeId) {

        const connection = await DbHelper.GetConnection();

        const register = await connection.getAsync("select * from " + this.dbName  + " where ThemeId = ?", [ThemeId]);
        
        await connection.closeAsync();

        if(register){
            return register;

        }
        else{
            return null
        }

    }



}