const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//create schema
const parentSchema = new Schema ({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: true, required: true},
    child: {type: Schema.Types.ObjectId, ref: "Child"}
})

//create model
const Parent = mongoose.model('Parent', parentSchema);


//export model
module.exports = Parent;