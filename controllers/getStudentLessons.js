const StudentModel = require('../models/studentModel')
const StudentsUnitModel = require('../models/studentUnitsModel')

const getStudentLessons = (req, res)=>{
    const studID = req.params.studId;

    console.log(studID);
}


module.exports = getStudentLessons;