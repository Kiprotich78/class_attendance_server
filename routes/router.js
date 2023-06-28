const express = require('express')
const router = express.Router();

const auth = require('../middlewares/authMiddleware')
const logIn = require('../controllers/logIn')
const signup = require('../controllers/signup')
const addStudent = require('../controllers/addStudent')
const getAllStudents = require('../controllers/getAllStudents')
const addStudentUnit = require('../controllers/addStudentUnit')
const getStudentUnits = require('../controllers/getStudentUnits')
const getStudentlessons = require('../controllers/getStudentLessons')
const addUnit = require('../controllers/addUnit')
const getAllUnits = require('../controllers/getAllUnits')
const addLesson = require('../controllers/addLesson')
const getAllLessons = require('../controllers/getAllLessons')


router.post('/login', logIn)
router.post('/signup', signup)

// protected routes
router.post('/addstudent', auth, addStudent)
router.get('/getAllStudents', auth, getAllStudents)
router.post('/addStudentUnit/:studId', auth, addStudentUnit)
router.get('/getStudentUnits/:studId', auth, getStudentUnits)
router.get('/getStudentLessons/:studId', auth, getStudentlessons)

router.post('/addUnit', auth, addUnit)
router.get('/getAllUnits', auth, getAllUnits);

router.post('/addlesson/:unitId', auth, addLesson)
router.get('/getAllLessons/:unitId', auth, getAllLessons)


module.exports = router;