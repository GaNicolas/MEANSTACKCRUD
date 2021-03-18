const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const express = require('express');
var router = express.Router();


const User = mongoose.model('User');

module.exports.register = (req,res,next)=>{
    var user = new User();
    user.login = req.body.login;
    user.password = req.body.password;
    user.age = req.body.age;
    user.race = req.body.race;
    user.nourriture = req.body.nourriture;
    user.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else{
            if(err.code==11000)
            res.status(422).send([user.login + " existe déjà !"]);
            else
                return next(err);
            
        }
        
    });
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        //erreur
        if (err) return res.status(400).json(err);

        //succès
        else if (user) return res.status(200).json({ "token" : user.generateJwt() });

        //mauvais login/mdp
        else return res.status(404).json(info);


    })(req,res);
} 

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id},
        (err,user) => {
            if(!user)
                return res.status(404).json({ status:false, message: 'Pangolin not found' });
            else
                return res.status(200).json({ status: true, user: _.pick(user,['_id','login','age','race','nourriture','friends']) });  
        });
}



