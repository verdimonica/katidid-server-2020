const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();

const Child = require ('./../models/child.model');

//Post '/api/child' to create a child card
router.post('/child', (req, res) => {
    const {name, surname, image, months, parentsMail, parentsPhone} = req.body;
    Child.create({name, surname, image, months, parentsMail, parentsPhone} )
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

//GET  all children for currently logged in teacher
router.get('/child', (req, res) =>{
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

//GET shows specific child
router.get('/child/:id', (req, res) =>{
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

// PUT edit child by id
router.put('/child/:id', (req, res) =>{
    const {id} = req.params;
    const {name, surname, image, months, parents, parentsMail, parentsPhone} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified child id is not valid'} );
          return;
    }

    Child.findByIdAndUpdate(id, {name, surname, image, months, parents, parentsMail, parentsPhone}, {new:true})
        .then((child) =>{
            res
              .status(200)
              .json(child);
        })
        .catch((err) =>{
            res
              .status(400)
              .json(err);
        })
});

//DELETE an specific child
router.delete('/child/:id', (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified child id is not valid'});
          return;
    }

    Child.findByIdAndRemove(id)
        .then(() =>{
            res
              .status(202)
              .send(`Child ${id} was removed successfully`);
        })
        .catch( err => {
            res
              .status(400)
              .json(err);
        })
})

module.exports = router;