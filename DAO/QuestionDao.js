import { DbHelper } from "../Utils/DbHelper";
import StandardDAO from "./StandardDao";

export class QuestionDao extends StandardDAO {
    
    constructor() {
        super("tbQuestion");
    }

    async Insert(model) {
        console.log(model.text);

        const connection = await DbHelper.GetConnection();

        // Removido o campo img
        const query = "INSERT INTO " + this.dbName + " (questionText, ThemeId, type) VALUES (?, ?, ?)";
        const result = await connection.runAsync(query, [model.text, model.themeId, model.type]);

        await connection.closeAsync();

        return result.lastInsertRowId;
    }

    async Update(model) {
        const connection = await DbHelper.GetConnection();

        // Removido o campo img
        const query = "UPDATE " + this.dbName + " SET questionText = ? WHERE id = ?";
        const result = await connection.execAsync(query, [model.text, model.id]);

        await connection.closeAsync();
        return result == 1;
    }

    async GetByThemeId(ThemeId) {
        const connection = await DbHelper.GetConnection();

        const register = await connection.getAsync(
            "SELECT * FROM " + this.dbName + " WHERE ThemeId = ?",
            [ThemeId]
        );

        await connection.closeAsync();

        return register || null;
    }
}
