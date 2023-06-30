const AttendanceModel = require("../models/attendanceModel")
const StudentModel = require("../models/studentModel")
const UnitModel = require("../models/unitModel")
const LessonModel = require("../models/lessonModel")
const StudentUnitsModel = require("../models/studentUnitsModel")

const filterByUnit = async (req, res)=>{
    const lecturerId = req.body.lecturerId;
    const unitID = req.params.unitId;

    try{
        const existingUnit = await UnitModel.findById({_id: unitID, lecturerId})

        if(!existingUnit){
            return res.json(404).json({Error: "Unit not found"})
        }

        const lecturerStudents = await StudentModel.find({ lecturerId });
        const filteredStudentUnits = await StudentUnitsModel.find({ unit: unitID });
        
        const filteredStudentsTakingTheUnit = lecturerStudents.filter((student) => {
          return filteredStudentUnits.find((unit) => {
            return student._id.toString() === unit.student.toString();
          });
        });
        
        const filteredAttendance = await AttendanceModel.find({unitId: unitID, lecturerId})
        const allLessons = await LessonModel.find({unitID}) 
        
        let outputArray = [];
        allLessons.forEach(lesson =>{
            console.log(lesson.lessonName)
            const filterAttendancePerLesson = filteredAttendance.filter(attendance => {
                return attendance.lessonId.toString() === lesson._id.toString()
            })

            let presentStudents = 0;
            const confirmStudentAttendance = filteredStudentsTakingTheUnit.map(student =>{
                if(filterAttendancePerLesson.find(lessonAttendance => student._id.toString() === lessonAttendance.studentId.toString())){
                    presentStudents += 1;
                    return {
                        _id: student._id,
                        firstName: student.firstName,
                        lastName: student.lastName,
                        registationNumber: student.registrationNumber,
                        email: student.email,
                        gender: student.gender,
                        phone: student.phone,
                        present: true

                    }
                }

                return {
                    _id: student._id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    registationNumber: student.registrationNumber,
                    email: student.email,
                    gender: student.gender,
                    phone: student.phone,
                    present: false

                }
            })

            outputArray.push({
                _id: lesson._id,
                lesson: lesson.lessonName,
                allStudents: filteredStudentsTakingTheUnit.length,
                presentStudents,
                absentStudents: filteredStudentsTakingTheUnit.length - presentStudents,
                students: confirmStudentAttendance
            })
        })


        return res.status(200).json(outputArray)
    }
    catch(error){
        return res.status(400).json({Error: "Something went wrong"})
    }
}

const filterByDate = (req, res)=>{

}

module.exports = {
    filterByUnit,
    filterByDate
}