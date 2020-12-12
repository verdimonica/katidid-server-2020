const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Child = require('./../models/child.model')
const Event = require('../models/event.model');

//POST '/api/child/:id/events' create an event in a child
router.post('/event', (req, res, next) =>{

    const {pampersBrown, pampersBlue, nap, meal, comment, date, childId} = req.body;
    Event.create({pampersBrown, pampersBlue, nap, meal, comment, date, childId})
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

//GET shows specific event
router.get('/event/:id', (req, res, next) =>{
    const {id} = req.params;
    Event
        .findById(id)
        .populate('events')
        .then((foundEvent) =>{
            res
            .status(200)
            .json(foundEvent);
    })
    .catch((err) =>{
        res
            .status(400)
            .json(err)
        });
})

// PUT edit event by id
router.put('/event/:id', (req, res, next) =>{
    const {id} = req.params;
    const {pampersBrown, pampersBlue, nap, meal, comment} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified event id is not valid'} );
          return;
    }

    Event.findByIdAndUpdate(id, {pampersBrown, pampersBlue, nap, meal, comment}, {new:true})
        .then((event) =>{
            res
              .status(200)
              .json(event);
        })
        .catch((err) =>{
            res
              .status(400)
              .json(err);
        })
});

// PUT  edit Event by id
router.put('/event/:id', (req, res, next) =>{
    const {id} = req.params;
    const {pampersBrown, pampersBlue, nap, meal, comment} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified Event id is not valid'} );
          return;
    }

    Eventt.findByIdAndUpdate(id, {pampersBrown, pampersBlue, nap, meal, comment}, {new:true} )
        .then((event) =>{
            res
              .status(200)
              .json(event);
        })
        .catch((err) =>{
            res
              .status(400)
              .json(err);
        })
});

//DELETE delete an specific event
router.delete('/event/:id', (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id) ) {
        res
          .status(400)
          .json({message: 'Specified event id is not valid'});
          return;
    }

    Event.findByIdAndRemove(id)
        .then(() =>{
            res
              .status(202)
              .send(`Event ${id} was removed successfully`);
        })
        .catch( err => {
            res
              .status(400)
              .json(err);
        })
})
module.exports = router;