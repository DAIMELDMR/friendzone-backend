const express = require('express');

const {signup, login} = require('../controllers/authController.js')

const router = express.Router()

//signup route
router.post('/signup', signup)

//signup route
router.post('/login', login)

module.exports = router;