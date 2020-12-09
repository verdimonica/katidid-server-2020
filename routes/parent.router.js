const express = require('express');
const {Mongoose} = require('mongoose');
const router = express.Router();

const Parent = require('./../models/parent.model');

//POST '/api/parent/:id' create a parent card
router.post('/parent/:id', (req,res,next) =>{
    const {name, email, phone, child:{id}} = re.body;
    
})


module.exports = router