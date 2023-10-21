const express = require("express");

const router = express.Router();

const appointmentsController = require("../controllers/appointmentsController");

const userAuthentication = require('../middlewares/auth')


// Appointment Requests

router.get("/admin/getAppointments", appointmentsController.getAppointments);

router.post("/bookAppointment",userAuthentication.authenticate, appointmentsController.createAppointment);

module.exports = router;
