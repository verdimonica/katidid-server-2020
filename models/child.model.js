const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//create schema
const childSchema = new Schema ({
    image: {type: String},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    parents_mail: {type: String, unique: true},
    parents_phone: {type: String, unique: true},
    parent: {type: Schema.Types.ObjectId, ref:"User"},
    events: [{type: Schema.Types.ObjectId, ref:"Events"}]
})


//create model
const Child = mongoose.model('Child', childSchema);


//export model
module.exports = Child;