class Controller {
    constructor(){
        if(this.constructor === Controller){
            throw new Error("Cannot Instance From Abstract Class")
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