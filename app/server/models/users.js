const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
       let auth = this.data.find((item) =>
            item.email == email && item.password == password  
        )
        // console.log(auth)
        if(auth){
            return true;
        }
        return false; 
        
    }

    getByEmail(email) { 
        for(let i=0; i<this.data.length; i++){
            const obj = this.data[i];
            if(obj.email == email){
                return obj;
            }
        }
        return null;
        
    }

    getByMatricNumber(matricNumber) {
        for(let i=0; i<this.data.length; i++){
            const obj = this.data[i];
            if(obj.matricNumber == matricNumber){
                return obj;
            }
        }
        return null;
        
    }

    validate(obj) { 
        this.errors = []
      let errormsg;
      let  allProps,emailval,matricval,passwordval = false
          Object.keys(obj).forEach(key => {
        if (obj[key] == '') {
          allProps = true;
            errormsg = `(${key} cannot be empty)`
            this.errors.push(errormsg)
        }
    })  
        this.data.forEach(key =>{
            if(obj.email == key.email){ 
                emailval = true;
                errormsg = `A user with ${key.email} email address already exists`;
                this.errors.push(errormsg);
                
            }
        }) 
        this.data.forEach(key =>{
            if(obj.matricNumber == key.matricNumber){
                matricval = true;
                errormsg = `A user with matric number ${key.matricNumber} already exists`;
                this.errors.push(errormsg);
                
            }
        }) 
            if(obj.password.length<7){
                passwordval = true;
                errormsg = "Password should have at least 7 characters";
                this.errors.push(errormsg);
                
            } 
            
        if(allProps || emailval || matricval || passwordval){
            return false;
        }
        return true;
        
    }
} 

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};