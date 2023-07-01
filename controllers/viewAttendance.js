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

        // Find the students taking the unit
        const filteredStudentsTakingTheUnit = lecturerStudents.filter((student) => {
          return filteredStudentUnits.find((unit) => {
            return student._id.toString() === unit.student.toString();
          });
        });
        
        const filteredAttendance = await AttendanceModel.find({unitId: unitID, lecturerId})
        const allLessons = await LessonModel.find({unitID}) 
        
        let outputArray = [];

        // check if the student was present or not
        allLessons.forEach(lesson =>{

            // return attendances with a perticular lesson
            const filterAttendancePerLesson = filteredAttendance.filter(attendance => {
                return attendance.lessonId.toString() === lesson._id.toString()
            })

            let presentStudents = 0;

            // check if the student is present
            const confirmStudentAttendance = filteredStudentsTakingTheUnit.map(student =>{
                if(filterAttendancePerLesson.find(lessonAttendance => student._id.toString() === lessonAttendance.studentId.toString())){
                    presentStudents += 1;
                    // returns true if the student is present
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
                
                // returns true if the student is present
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
                date: lesson.date,
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
    const lecturerId = req.body.lecturerId
    const date = req.params.date

    try{
        if(!checkDate(date)){
            return res.status(400).json({Error: "Invalid date input"})
        }

        return res.status(400).json("success")


    }
    catch(error){
        return res.status(400).json({Error: "Somethig went wrong"});
    }

}

function checkDate(date) {
    // Convert the date to string and extract the year, month, and day
    let dateStr = date.toString();
    let year = parseInt(dateStr.slice(0, 4), 10);
    let month = parseInt(dateStr.slice(4, 6), 10);
    let day = parseInt(dateStr.slice(6, 8), 10);
  
    // Perform validation checks
    if (year < 1 || year > 9999) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    if (day < 1 || day > 31) {
      return false;
    }
  
    // Additional checks for specific months and days
    if ([4, 6, 9, 11].includes(month) && day > 30) {
      return false;
    }
    if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        if (day > 29) {
          return false;
        }
      } else if (day > 28) {
        return false;
      }
    }
  
    // Check if the date is greater than today's date
    let today = new Date();
    let inputDate = new Date(year, month - 1, day);
    if (inputDate > today) {
      return false;
    }
  
    // If all checks pass, the date is considered valid
    return true;
  }
  
module.exports = {
    filterByUnit,
    filterByDate
}