import StandardModel from "./StandardModel"

export default class QuestionModel extends StandardModel{

    #text;
    #themeId;
    #type;

    // Construtor
    constructor(id = null, text = "", themeId, type = "") {
        super(id);
        this.#text = text;
        this.#themeId = themeId;
        this.#type = type;
    }
    get type() {
        return this.#type;
    }
    set type(value) {
        if (value !== "alternativa" && value !== "verdadeiroFalse") {
            throw new Error("Tipo de questão inválido");
        }
        this.#type = value;
    }

    get text(){
        return this.#text
    }



    set text(value) {
        if (!value || typeof value !== 'string') {
            throw new Error("Texto da pergunta inválido");
        }
        this.#text = value;
    }
    get themeId(){
        return this.#themeId;
    }

    set themeId(themeId) {
        if (themeId === null || themeId === undefined || themeId === "") {
            throw new Error("Id inválido");
        }
        if (Number.isNaN(Number(themeId))) {
            throw new Error("Id não é um número");
        }

        this.#themeId = Number(themeId);
    }


}