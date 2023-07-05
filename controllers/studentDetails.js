const StudentModel = require("../models/studentModel")
const StudentUnitsModel = require("../models/studentUnitsModel")
const LessonsModel = require("../models/lessonModel")
const AttendanceModel = require("../models/attendanceModel")


const studentDetails = async (req, res)=>{
    const lecturerId = req.body.lecturerId;
    const studentId = req.params.studentId;

    try{
        const existingStudent = await StudentModel.findById(studentId)
        if(!existingStudent){
            return res.status(404).json({Error: "Student Not Found"});
        }

        if(existingStudent.lecturerId.toString() !== lecturerId){
            return res.status(404).json({Error: "Student Not Found"});
        }

        const studentUnits = await StudentUnitsModel.find({student: studentId}).populate('unit').exec()
        if(!studentUnits.length){
            return res.status(200).json({
                firstName: existingStudent.firstName,
                lastName: existingStudent.lastName,
                registrationNumber: existingStudent.registrationNumber,
                email: existingStudent.email,
                phone: existingStudent.phone,
                gender: existingStudent.gender,
                totalUnitsTaken: 0,
                units: []
            })
        }

        let units = []
        for(i = 0; i < studentUnits.length; i++){
            const unitLessons = await LessonsModel.find({unitID: studentUnits[i].unit._id})
            // console.log(unitLessons)
           let singleUnit = []
           let attendedLessons = 0
            for(j = 0; j < unitLessons.length; j++){
                const attendedlesson = await AttendanceModel.find({
                    lecturerId,
                    studentId,
                    unitId: studentUnits[i].unit._id,
                    lessonId: unitLessons[j]._id
                })

                if(attendedlesson.length){
                    attendedLessons++
                    singleUnit.push({
                        _id: unitLessons[j]._id,
                        lessonName: unitLessons[j].lessonName,
                        date: unitLessons[j].date,
                        startTime: unitLessons[j].startTime,
                        duration: unitLessons[j].duration,
                        attended: true
                    })
                }else{
                    singleUnit.push({
                        _id: unitLessons[j]._id,
                        lessonName: unitLessons[j].lessonName,
                        date: unitLessons[j].date,
                        startTime: unitLessons[j].startTime,
                        duration: unitLessons[j].duration,
                        attended: false
                    })
                }
            }

            units.push({
                unitName: studentUnits[i].unit.name,
                attendedLessons,
                missedlessons: unitLessons.length - attendedLessons,
                lessons: singleUnit
            })

        }
        

        res.status(200).json({
            firstName: existingStudent.firstName,
            lastName: existingStudent.lastName,
            registrationNumber: existingStudent.registrationNumber,
            email: existingStudent.email,
            phone: existingStudent.phone,
            gender: existingStudent.gender,
            totalUnitsTaken: studentUnits.length,
            units
        })
    }
    catch(error){
        res.status(500).json({Error: error.message})
    }
}


module.exports = studentDetails