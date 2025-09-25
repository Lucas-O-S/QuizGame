import StandardModel from "./StandardModel"


export default class AnswerModel extends StandardModel {
    
    #text;
    #right;
    #questionId

    // C
    constructor(id = null, text = "", right = false, questionId = null) {
        super(id)
        this.#text = text;
        this.#right = right;
        this.#questionId = questionId;
    }

    // Getters
    get text(){
        return this.#text
    }

    get right(){
        return this.#right
    }

    // Setters
    set text(value){
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new Error('text deve ser um número inteiro')
        }
        this.#text = value;
    }

    set right(value) {
        this.#right = !!value;
    }

    get questionId(){
        return this.#questionId;
    }

    set questionId(questionId){
        
        if(Number.isNaN(Number(id))) throw new Error("Id não é um numero");
        
        if (value === null || value === undefined || value === "") throw new Error("Id inválido");

        this.#questionId = Number(questionId);
    }
}