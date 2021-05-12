const { User } = require("./users");

class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        for(let i=0; i<this.data.length; i++){
            const obj = this.data[i];
            if(id == obj.id){
                return obj;
            }
        }
        return null;
    }

    save(obj) {
        if (this.validate(obj)) { 
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let user = this.data.find(usr => usr.id == id);
        if(user){
            for(const key in obj){
                user[key] = obj[key];
            }
            return true;
        }
        return false;
    }

    delete(id) {
        let del = this.data.find((item) => item.id == id)
        if(del){
            this.data.splice(this.data.indexOf(del), 1);
            return true;
        }
        return false;
        // console.log(del.id);
        // if(this.data.includes(id)){
        //    let fdel = del.filter(key => key.id !== id)
        //    return fdel ? true : false;
        //     return true;
        // }else{
        //     return false;
        // }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;