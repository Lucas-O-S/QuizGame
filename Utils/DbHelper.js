import * as SqLite from 'expo-sqlite';

export class DbHelper {
    static async GetConnection() {
        return await SqLite.openDatabaseAsync("DbQuiz");
    }

    static async ThemeDbStart() {
        const query = `CREATE TABLE IF NOT EXISTS tbTheme (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )`;

        const connection = await this.GetConnection();
        await connection.execAsync(query);
        await connection.closeAsync();
    }

    static async QuestionDbStart() {
        const query = `CREATE TABLE IF NOT EXISTS tbQuestion (
            id INTEGER PRIMARY KEY,
            questionText TEXT NOT NULL,
            img BLOB,
            ThemeId INTEGER NOT NULL,
            type TEXT NOT NULL,
            FOREIGN KEY(ThemeId) REFERENCES tbTheme(id)
        )`;

        const connection = await this.GetConnection();
        await connection.execAsync(query);
        await connection.closeAsync();
    }

    static async AnswerDbStart() {
        const query = `CREATE TABLE IF NOT EXISTS tbAnswer (
            id INTEGER PRIMARY KEY,
            answer TEXT NOT NULL,
            isRight INTEGER not null,
            type TEXT NOT NULL,
            questionId INTEGER NOT NULL,
            FOREIGN KEY(questionId) REFERENCES tbQuestion(id)
        )`;

        const connection = await this.GetConnection();
        await connection.execAsync(query);
        await connection.closeAsync();
    }

    static async StartDb() {
        await this.ThemeDbStart();
        await this.QuestionDbStart();
        await this.AnswerDbStart();
    }
}
