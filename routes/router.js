const express = require('express')
const router = express.Router();

const logIn = require('../controllers/logIn')
const signup = require('../controllers/signup')
const addStudent = require('../controllers/addStudent')


router.post('/login', logIn)
router.post('/signup', signup)
router.post('/addstudent', addStudent)

module.exports = router;