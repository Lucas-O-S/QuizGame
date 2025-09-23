import StandardModel from "./StandardModel"

export default class ThemeModel extends StandardModel{

    #name;

    constructor(id = "", name = ""){
        super(id);
        this.name = name
    }

    get name(){
        return this.#name
    }

    set name(name){
        if(name === null || name === undefined || name === "") throw new Error("Nome está vazio")
            
        this.#name = name;
    }

}