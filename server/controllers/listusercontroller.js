const mongoose = require('mongoose')
const express = require('express');
var router = express.Router();
var ObjectId = mongoose.Types.ObjectId;

const User = mongoose.model('User');

router.get('/',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){res.send(docs);}
        else {console.log('Error in Retriving employees :'+JSON.stringify(err,undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record');
    
        var user={
            age: req.body.age,
            race: req.body.race,
            nourriture: req.body.nourriture,
            friends: req.body.friends
        };
        User.findByIdAndUpdate(req.params.id, {$set:user},{new:true},(err,docs)=>{
            if(!err){ res.send(docs); }
            else { console.log('Error in update'); }
        });

});

module.exports = router;