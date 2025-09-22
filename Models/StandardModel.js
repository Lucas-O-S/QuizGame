

class StandardModel{

    #id;
    

    constructor(id = ""){
        this.#id = id;    
    }

    get id() {
        return this.#id;
    }

    set id(id){
        if(Number.isNaN(id)) throw new Error("Id não é um numero");

        this.#id = id;
        
    }

}