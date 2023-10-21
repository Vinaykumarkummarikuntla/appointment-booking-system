const mongoose = require('mongoose');

// Appointments Schema
const appointmentSchema = new mongoose.Schema({
  full_name: {
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
  phone: {
    type: String,
    required: true,
  },
  appointment_date: {
    type: Date,
    required: true,
  },
  appointment_time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

// Create the Mongoose Model for 'appointment'
const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;
