const express = require('express')

const router = express.Router()

const loginController = require('../controllers/loginController')

const signupController = require('../controllers/signupController')

// Login
router.post('/signup', signupController.createUser)

// Signup
router.post('/login', loginController.loginUser)

module.exports = router
