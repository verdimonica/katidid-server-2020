const express = require ('express');
const router = express.Router();

const Child = require ('./../models/child.model');

//Post '/api/child' to create a child card
router.post('/child')


module.exports = router;