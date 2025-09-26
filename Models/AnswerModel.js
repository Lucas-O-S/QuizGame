import StandardModel from "./StandardModel";

export default class AnswerModel extends StandardModel {
    
    #text;
    #isRight;
    #questionId;
    #type;

    constructor(
        id = null,
        text = "",
        isRight = false,
        questionId = null,
        type = "alternativa"
    ) {
        super(id);
        this.#text = text;
        this.#isRight = !!isRight;
        this.#questionId = questionId !== null ? Number(questionId) : null;
        this.#type = type;
    }

    // --- Getters ---
    get text() {
        return this.#text;
    }

    get isRight() {
        return this.#isRight;
    }

    get questionId() {
        return this.#questionId;
    }

    get type() {
        return this.#type;
    }

    // --- Setters ---
    set text(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("text deve ser uma string não vazia");
        }
        this.#text = value;
    }

    set isRight(value) {
        // força para booleano
        this.#isRight = !!value;
    }

    set questionId(value) {
        const num = Number(value);
        if (!Number.isInteger(num) || num <= 0) {
            throw new Error("questionId deve ser um número inteiro positivo");
        }
        this.#questionId = num;
    }

    set type(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("type deve ser uma string não vazia");
        }
        // Se quiser limitar tipos:
        const tiposPermitidos = ["alternativa", "dissertativa", "verdadeiroFalso"];
        if (!tiposPermitidos.includes(value)) {
            throw new Error(
                `type inválido. Permitidos: ${tiposPermitidos.join(", ")}`
            );
        }
        this.#type = value;
    }
}
