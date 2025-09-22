

class AnswerModel extends StandardModel {
    
    #text;
    #right;

    // C
    constructor(text = 0, right = false) {
        this.#text = text;
        this.#right = right;
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
}