
import * as SqLite from 'expo-sqlite';

export class DbHelper{

    static async GetConnection(){
        return await SqLite.openDatabaseAsync("DbQuiz")
    }

    static async StartDb(){
        await this.ThemeDbStart();
        await this.QuestionDbStart();
        await this.AnswerDbStart();
    }


    async ThemeDbStart () {
        const query = ` Create Table if not exist tbTheme(
            id Integer primary key,
            name text not null
        ) `;

        let connection = await this.GetConnection();

        await connection.execAsync(query);

        await connection.closeAsync();

    }
    async QuestionDbStart () {
        const query = ` Create Table if not exist tbQuestion(
            id Integer primary key,
            questionText text not null,
            img blob,
            Foreign key(ThemeId). references tbTheme(id) not null
        ) `;

        let connection = await this.GetConnection();

        await connection.execAsync(query);

        await connection.closeAsync();
    }

    //Right deve funcionar que nem boolean 0 ou 1
    async AnswerDbStart () {
        const query = ` Create Table if not exist tbAnswer(
            id Integer primary key,
            answer text not null,
            right integer,
            Foreign key(questionId). references tbQuestion(id) not null
        ) `;

        let connection = await this.GetConnection();

        await connection.execAsync(query);

        await connection.closeAsync();
    }







}