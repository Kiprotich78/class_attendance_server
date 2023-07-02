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

const filterByDate = async (req, res)=>{
    const lecturerId = req.body.lecturerId
    const date = req.params.date

    try{
        const dateIso = checkDate(date)
        if(!dateIso){
            return res.status(400).json({Error: "Invalid date input"})
        }

        // filter attendance by date and lectuerId
        const filteredAttendance = await AttendanceModel.find({
            createdAt: { $gte: dateIso, $lt: new Date(dateIso).setHours(24) },
            lecturerId
        }).populate("unitId").populate("lessonId");


        let arraysByUnitId = {}; 
        let totalUnits = 0;


        // devide attendance into different arrays by unit id
        for(let i = 0; i < filteredAttendance.length; i++){
            const singleAttendance = filteredAttendance[i]
            const unit = filteredAttendance[i].unitId._id

            if(!arraysByUnitId[unit]){
                arraysByUnitId[unit] = []
                totalUnits ++;
            }

           
            arraysByUnitId[unit].push(singleAttendance)

        }

        let outputData = {
            message: "success",
            totalUnits: totalUnits,
            units: []
        }
       

        for (const key in arraysByUnitId) {
            if (arraysByUnitId.hasOwnProperty(key)) {
                const lecturerStudents = await StudentModel.find({ lecturerId });
                const filteredStudentUnits = await StudentUnitsModel.find({ unit: key });

                const lessonIds = []
                // Exctact lessons thought on that day
                arraysByUnitId[key].forEach(attendance => {
                    if(!lessonIds.find(lesson => lesson === attendance.lessonId._id.toString())){
                        lessonIds.push(attendance.lessonId._id.toString())
                    }
                })

                let outputUnits = {
                    _id: arraysByUnitId[key][0].unitId._id,
                    unitName:  arraysByUnitId[key][0].unitId.name,
                    totalLessons: lessonIds.length,
                    lessons: []
                }

                // Find the students taking the unit
                const filteredStudentsTakingTheUnit = lecturerStudents.filter((student) => {
                    return filteredStudentUnits.find((unit) => {
                        return student._id.toString() === unit.student.toString();
                    });
                });

                lessonIds.forEach(lesson => {
                    // return attendances with a perticular lesson
                    const filterAttendancePerLesson = arraysByUnitId[key].filter(attendance => {
                        return attendance.lessonId._id.toString() === lesson;
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

                    outputUnits.lessons.push({
                        _id: filterAttendancePerLesson[0].lessonId._id,
                        lesson: filterAttendancePerLesson[0].lessonId.lessonName,
                        allStudents: filteredStudentsTakingTheUnit.length,
                        presentStudents,
                        absentStudents: filteredStudentsTakingTheUnit.length - presentStudents,
                        date: filterAttendancePerLesson[0].lessonId.date,
                        students: confirmStudentAttendance
                    })

                })
            
                outputData.units.push(outputUnits);
                
            }
        }     
        

        return res.status(200).json(outputData)


    }
    catch(error){
        return res.status(400).json({Error: error});
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
    return inputDate.toISOString();
  }
  
module.exports = {
    filterByUnit,
    filterByDate
}