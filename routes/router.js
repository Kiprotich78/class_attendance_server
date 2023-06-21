const express = require('express')
const router = express.Router();

const logIn = require('../controllers/logIn')
const signup = require('../controllers/signup')


router.post('/login', logIn)
router.post('/signup', signup)

module.exports = router;