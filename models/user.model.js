const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  phone: {type: String, required: true},
  password: {type: String, required: true},
  userType: { type: String, enum: ['teacher', 'parent']},
  children: [{type: Schema.Types.ObjectId, ref: "Child"}],
  child: {type: Schema.Types.ObjectId, ref: "Child"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;