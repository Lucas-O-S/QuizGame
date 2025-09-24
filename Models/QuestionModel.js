import { decode as atob, encode as btoa } from 'base-64';
import StandardModel from "./StandardModel"

export default class QuestionModel extends StandardModel{

    #text;
    #imgByte;
    #imgString;
    #themeId;

    // Construtor
    constructor(id = null, text = "", imgByte = null, themeId = null){
        
        super(id);

        this.#text = text;
        this.#imgByte = imgByte;
        this.#imgString = imgString;
        this.#themeId = themeId;

        // Sincroniza imgByte e imgString se apenas uma for passada
        if (this.#imgByte && !this.#imgString) {
            this.#imgString = QuestionModel.bytesToBase64(this.#imgByte);
        } else if (this.#imgString && !this.#imgByte) {
            this.#imgByte = QuestionModel.base64ToBytes(this.#imgString);
        }
    }

    // Getters
    get text(){
        return this.#text
    }

    get imgByte(){
        return this.#imgByte
    }

    get imgString(){
        return this.#imgString
    }


    // Setters
    set text(value){
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new Error('text deve ser um número inteiro')
        }
        this.#text = value;
    }

    get themeId(){
        return this.#themeId;
    }

    set themeId(themeId){
        
        if(Number.isNaN(Number(themeId))) throw new Error("Id não é um numero");
        
        if (value === null || value === undefined || value === "") throw new Error("Id inválido");

        this.#themeId = Number(themeId);
    }

    set imgByte(bytes) {
        if (
            !(bytes instanceof Uint8Array) &&
            !(bytes instanceof ArrayBuffer) &&
            bytes !== null
        ) {
            throw new Error('imgByte deve ser um Uint8Array, ArrayBuffer ou null')
        }
        this.#imgByte = bytes;
        this.#imgString = bytes ? QuestionModel.bytesToBase64(bytes) : null;
    }

    set imgString(base64) {
        if (base64 && typeof base64 !== 'string') {
            throw new Error('imgString deve ser uma string base64 ou null');
    }
    
    this.#imgString = base64;
    this.#imgByte = base64 ? QuestionModel.base64ToBytes(base64) : null;
    }

    // Métodos utilitários estáticos
    /**
     * Converte base64 para Uint8Array
     * @param {string} base64
     * @returns {Uint8Array}
     */
    static base64ToBytes(base64) {
        if (!base64) return null;

        const cleanBase64 = base64.split(',').pop(); // remove prefixo data:image/...;base64,
        const binaryStr = atob(cleanBase64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
        }
        return bytes;
    }

    /**
     * Converte Uint8Array ou ArrayBuffer para base64
     * @param {Uint8Array|ArrayBuffer} bytes
     * @returns {string}
     */
    static bytesToBase64(bytes, includePrefix = false, mime = 'image/png') {
        if (!bytes) return null;

        const arr = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes;
        let binary = '';

        for (let i = 0; i < arr.byteLength; i++) {
        binary += String.fromCharCode(arr[i]);
        }

        const base64 = btoa(binary);
        return includePrefix ? `data:${mime};base64,${base64}` : base64;
    }


}