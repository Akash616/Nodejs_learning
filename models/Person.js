const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the Peson Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },

    //Authentication
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

//password with hash password+salt
personSchema.pre('save', async function(next){

    const person = this;
    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        //Hash password generation
        const salt = await bcrypt.genSalt(10);

        //Hash password
        const hasedPassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the hashed one
        person.password = hasedPassword;

        next(); //proceed now save in db
    }catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }

    //akash ---> wedfghjksdfghjkrtyui
    //login ---> gupta

    //wedfghjksdfghjkrtyui  ---> extract salt
    //salt + gupta  ---> hash ---> erghjkdfghjrtyucvbgh

}

//Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;