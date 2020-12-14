const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//create schema
const childSchema = new Schema ({
    image: {type: String},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    months: {type: Number, required: true},
    parentsMail: {type: String, unique: true},
    parentsPhone: {type: String, unique: true},
    parent: {type: Schema.Types.ObjectId, ref:"User"}
})


//create model
const Child = mongoose.model('Child', childSchema);


//export model
module.exports = Child;