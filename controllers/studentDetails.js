const StudentModel = require("../models/studentModel")
const AttendanceModel = require("../models/attendanceModel")


const studentDetails = (req, res)=>{
    const lecturerId = req.body.lecturerId;
    const studentId = req.params.studentId;

    try{
        
    }
    catch(error){
        res.status(500).json({Error: error.message})
    }
}


module.exports = studentDetails