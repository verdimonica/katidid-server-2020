const express = require ('express');
const router = express.Router();

const Child = require ('./../models/child.model');

//Post '/api/child' to create a child card
router.post('/child', (req, res, next) => {
    const {name, image, age, parents, parents_mail, parents_phone} = req.body;
    Child.create({name, image, age, parents, parents_mail, parents_phone, events:[]} )
        .then( (createdChild) => {
            res
            .status(201)
            .json(createdChild);
        } )
        .catch((err) => {
            res
            .status(400)
            .json(err)
        } );
} )

module.exports = router;