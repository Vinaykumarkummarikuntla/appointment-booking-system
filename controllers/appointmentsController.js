const Appointment = require("../models/appointmentsModel");

exports.createAppointment = async (req, res) => {
  const {
    full_name,
    email,
    phone,
    appointment_date,
    appointment_time,
    reason} = req.body;

  try {
    const currentDate = new Date();
    const selectedDate = new Date(appointment_date);

    if (selectedDate <= currentDate) {
      return res.status(400).json({ error: "Appointment date must be in the future dates" });
    }

    const existingAppointment = await Appointment.findOne({
      // email: email,
      appointment_date: appointment_date,
      appointment_time: appointment_time,
    });

    if (existingAppointment) {
      return res.status(400).json({ error: "Already appointment is booked this date and time !!! Book another appoinment" });
    }

    // Create the new appointment
    const appointment = await Appointment.create({
      full_name,
      email,
      phone,
      appointment_date,
      appointment_time,
      reason,
    });

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "An error occurred while creating the appointment" });
  }
};


// GET Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    if (appointments.length === 0) {
      res.status(404).json({ error: "No appointments booked" });
    } else {
      res.status(200).json(appointments);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching appointments" });
  }
};

