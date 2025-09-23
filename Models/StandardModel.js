class StandardModel{

    #id;

    constructor(id = ""){
        this.id = id;    
    }

    get id() {
        return this.#id;
    }

    set id(id){

        if(Number.isNaN(Number(id))) throw new Error("Id não é um numero");
        
        if (value === null || value === undefined || value === "") throw new Error("Id inválido");

        this.#id = Number(id);
        
    }

}

export default StandardModel