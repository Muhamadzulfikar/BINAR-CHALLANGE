class Controller {
    constructor(){
        if(this.constructor === Controller){
            throw new Error("Cannot Instatiate From Abstract Class")
        }
    }

    index() {

    }

    store() {

    }

    show(){
        
    }

    update() {

    }

    delete() {

    }
}

module.exports = Controller;