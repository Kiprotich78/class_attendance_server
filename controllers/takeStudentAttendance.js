const AttendanceModel = require('../models/attendanceModel')
const StudentModel = require('../models/studentModel')
const StudentUnitModel = require('../models/studentUnitsModel')
const LessonModel = require('../models/lessonModel')

const takeStudentAttendance = async (req, res)=>{
    const lecturerId = req.body.lecturerId
    const studentId = req.body.studentId
    const unitId = req.body.unitId
    const lessonId = req.body.lessonId

    try{
        if(!lecturerId || !studentId || !unitId || !lessonId){
            return res.status(400).json({Error: "All fields are required"})
        }

        const student = await StudentModel.findById({_id: studentId})

        if(student.lecturerId.toString() !== lecturerId){
            return res.status(400).json({Error: "Student not found"});
        }

        const studentUnit = await StudentUnitModel.find({student: studentId})

        if(!studentUnit.some( unit => unit.unit.toString() === unitId)){
            return res.status(400).json({Error: "Student does Not take the selected unit"});
        }

        const lesson = await LessonModel.findById({_id: lessonId});

        if(!lesson){
            return res.status(400).json({Error: "Lesson not Found"});
        }

        const existingAttendance = await AttendanceModel.find({studentId})

        if(existingAttendance.some(attendance => attendance.lessonId.toString() === lessonId)){
            return res.status(400).json({Error: "You have Already Taken attendance"});
        }

        const attendance = new AttendanceModel({
            lecturerId,
            studentId,
            unitId,
            lessonId,
        })

        const savedAttendance = await attendance.save()

        return res.status(200).json({
            message: "Attendance taken successfully", 
            attendance: savedAttendance
        });
    }
    catch(error){
        console.log(error)
        return res.status(400).json({Error: "Something went wrong"})
    }
}

module.exports = takeStudentAttendance;