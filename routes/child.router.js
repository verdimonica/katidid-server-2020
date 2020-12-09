const express = require ('express');
const router = express.Router();

const Child = require ('./../models/child.model');

//Post '/api/child' to create a child card
router.post('/child', (req, res, next) => {
    const {name, image, age, parents, parents_mail, parents_phone} = req.body;
    Child.create({name, image, age, parents, parents_mail, parents_phone, events:[]} )
        .then((createdChild) =>{
            res
              .status(201)
              .json(createdChild);
        } )
        .catch((err) =>{
            res
              .status(400)
              .json(err)
        });
})

//GET '/api/child' returns all children for currently logged in teacher
router.get('/child', (req, res, next) =>{
    Child
    .find()
    .populate('events')
    .then((allChildren) =>{
        res
          .status(200)
          .json(allChildren);
    })
    .catch((err) =>{
        res
          .status(400)
          .json(err)
    });
})

//GET '/api/child/:id' shows specific child
router.get('/child/:id', (req, res, next) =>{
    const {id} = req.params;
    Child
        .findById(id)
        .populate('events')
        .then((foundChild) =>{
            res
              .status(200)
              .json(foundChild);
        })
        .catch((err) =>{
            res
              .status(400)
              .json(err)
            });
})

module.exports = router;