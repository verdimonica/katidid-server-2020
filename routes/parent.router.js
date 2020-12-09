const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Parent = require('./../models/parent.model');

//POST '/api/parents' create a parent card
router.post('/parent', (req, res, next) =>{
    const {name, email, phone, childId} = req.body;
    Parent.create({name, email, phone, childId})
        .then((createdParent) =>{
            res
              .status(201)
              .json(createdParent);
        })
        .catch((err) =>{
            res
              .status(400)
              .json(err)
        });
})

// PUT '/api/parents/:id edit parent by id
router.put('/parent/:id', (req, res, next) =>{
    const {id} = req.params;
    const {name, email, phone, childId} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified parent id is not valid'} );
          return;
    }

    Parent.findByIdAndUpdate(id, {name, email, phone, childId}, {new:true} )
        .then((parent) =>{
            res
              .status(200)
              .json(parent);
        })
        .catch((err) =>{
            res
              .status(400)
              .json(err);
        })
});

//DELETE '.api/parents/:id' delete an specific parent
router.delete('/parent/:id', (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified parent id is not valid'});
          return;
    }

    Parent.findByIdAndRemove(id)
        .then(() =>{
            res
              .status(202)
              .send(`Parent ${id} was removed successfully`);
        })
        .catch( err => {
            res
              .status(400)
              .json(err);
        })
})

module.exports = router;