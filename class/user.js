var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  id: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
});

var UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel