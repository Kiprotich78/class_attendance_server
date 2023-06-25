const express = require('express')
const router = express.Router();

const auth = require('../middlewares/authMiddleware')
const logIn = require('../controllers/logIn')
const signup = require('../controllers/signup')
const addStudent = require('../controllers/addStudent')
const getAllStudents = require('../controllers/getAllStudents')
const addUnit = require('../controllers/addUnit')
const getAllUnits = require('../controllers/getAllUnits')


router.post('/login', logIn)
router.post('/signup', signup)

// protected routes
router.post('/addstudent', auth, addStudent)
router.get('/getAllStudents', auth, getAllStudents)

router.post('/addUnit', auth, addUnit)
router.get('/getAllUnits', auth, getAllUnits);


module.exports = router;