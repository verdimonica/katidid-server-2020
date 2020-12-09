const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  phone: {type: String, required: true},
  password: {type: String, required: true},
  userType: { type: String, enum: ['teacher', 'parent']},
  profile: { type: Schema.Types.ObjectId },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;