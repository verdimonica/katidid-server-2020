const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//create schema
const teacherSchema = new Schema ({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: true, required: true},
    children: [{type: Schema.Types.ObjectId, ref: "Child"}]
})

//create model
const Teacher = mongoose.model('Teacher', teacherSchema);


//export model
module.exports = Teacher;