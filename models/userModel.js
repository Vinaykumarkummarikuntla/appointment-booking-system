const mongoose = require('mongoose');

// USER Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /\S+@\S+\.\S+/.test(email);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\/\\|-]).{8,}$/.test(password);
      },
      message: 'Password must be strong',
    },
  },
  
});


const User = mongoose.model('User', userSchema);

module.exports = User;