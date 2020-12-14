const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/user.model");

//POST create a parent card
router.post('/parent', (req, res, next) =>{
    const {name, email, phone, password, userType} = req.body;
    User.findOne({ email })
    .then( (foundUser) => {

      if (foundUser) {
        // If email is already taken, then return error response
        return next( createError(400) ); // Bad Request
      }
      else {
        // If email is available, go and create a new user
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        
        User.create( { name, email, phone, childId, password: encryptedPassword})
          .then( (createdUser) => {
            // set the `req.session.currentUser` using newly created user object, to trigger creation of the session and cookie
            createdUser.password = "*";
            res
              .status(201)
              .json(createdUser);

          })
          .catch( (err) => {
            next( createError(err) );
          });
      }
    })
})

// PUT  edit parent by id
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

//DELETE delete an specific parent
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