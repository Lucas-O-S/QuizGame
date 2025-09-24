
import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";


export class QuestionDao extends StandardDAO{
    
    
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