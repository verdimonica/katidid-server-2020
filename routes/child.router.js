const express = require ('express');
const mongoose = require('mongoose');
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

router.post('/events', (req, res, next) => {
    const {pampersBrown, pampersBlue, nap,meal,comment, date} = req.body;
    Child.create({events:[{pampersBrown, pampersBlue, nap,meal,comment, date}]} )
        .then((createdEvent) =>{
            res
                .status(201)
                .json(createdEvent);
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

// PUT '/api/child/:id edit child by id
router.put('/child/:id', (req, res, next) =>{
    const {id} = req.params;
    const {name, image, age, parents, parents_mail, parents_phone} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified child id is not valid'} );
          return;
    }

    Child.findByIdAndUpdate(id, {name, image, age, parents, parents_mail, parents_phone}, {new:true})
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

//DELETE '.api/childs/:id' delete an specific child
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