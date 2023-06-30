const express = require('express')
const router = express.Router();

const auth = require('../middlewares/authMiddleware')

const logIn = require('../controllers/logIn')
const signup = require('../controllers/signup')

const addStudent = require('../controllers/student/addStudent')
const getAllStudents = require('../controllers/student/getAllStudents')
const addStudentUnit = require('../controllers/student/addStudentUnit')
const getStudentUnits = require('../controllers/student/getStudentUnits')
const getStudentlessons = require('../controllers/student/getStudentLessons')
const generateQRcode = require('../controllers/generateQRcode')
const takeStudentAttendance = require('../controllers/takeStudentAttendance')

const addUnit = require('../controllers/unit/addUnit')
const getAllUnits = require('../controllers/unit/getAllUnits')
const addLesson = require('../controllers/unit/addLesson')
const getAllLessons = require('../controllers/unit/getAllLessons')

const {filterByUnit, filterByDate} = require('../controllers/viewAttendance')

router.post('/login', logIn)
router.post('/signup', signup)

// protected routes
router.post('/addstudent', auth, addStudent)
router.get('/getAllStudents', auth, getAllStudents)
router.post('/addStudentUnit/:studId', auth, addStudentUnit)
router.get('/getStudentUnits/:studId', auth, getStudentUnits)
router.get('/getStudentLessons/:studId', auth, getStudentlessons)
router.get('/grcode', auth, generateQRcode);
router.post('/attendance', takeStudentAttendance)

router.post('/addUnit', auth, addUnit)
router.get('/getAllUnits', auth, getAllUnits);

router.post('/addlesson/:unitId', auth, addLesson)
router.get('/getAllLessons/:unitId', auth, getAllLessons)

// attendance routes
router.get('/filterByUnit/:unitId', auth, filterByUnit)
router.get('/filterByDate/:unitId', auth, filterByDate)

module.exports = router;