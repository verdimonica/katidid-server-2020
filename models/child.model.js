const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//create schema
const childSchema = new Schema ({
    image: {type: String},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    parents_mail: {type: String, unique: true},
    parents_phone: {type: String, unique: true},
    events: [
        {
        pampersBrown: { type:  Boolean},
        pampersBlue: { type: Boolean},
        nap: { type: Boolean},
        meal: { type: Boolean},
        comment: { type: String },
        date: {type: Date, default: Date.now}
        }
    ]
})

//create model
const Child = mongoose.model('Child', childSchema);


//export model
module.exports = Child;