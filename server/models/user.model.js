const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: 'Login needed',
        unique: true 
    },
    password: {
        type: String,
        required: 'Password needed',
        minlength : [1, 'Password at least 1 long']
    },
    saltSecret: String,
    age: {
        type: String
    },
    race: {
        type: String
    },
    nourriture: {
        type: String
    },
    friends: {
        type: Array
    }
});


userSchema.pre('save', function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User',userSchema);

