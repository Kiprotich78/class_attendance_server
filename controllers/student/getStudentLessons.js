const { mongoose } = require('mongoose');
const StudentsUnitModel = require('../../models/studentUnitsModel')
const LessonModel = require('../../models/lessonModel')


const getStudentLessons = async (req, res)=>{
    const studID = req.params.studId;


    try{
        let studId
        try{
            studId = new mongoose.Types.ObjectId(studID)
        }
        catch(error){
            return res.status(400).json({Error: "Student ID Error"})
        }

        const studentUnits = await StudentsUnitModel.find({student: studId}).populate('student').exec();

        const studentId = studentUnits[0].student._id;
        const studentName = studentUnits[0].student.firstName + " " + studentUnits[0].student.lastName;
        const studentReg = studentUnits[0].student.registrationNumber;

        let unitsArray = [];
        for(let i = 0; i < studentUnits.length; i++){
            const unitId = studentUnits[i].unit;
            const lessons = await LessonModel.find({unitID: unitId}).populate('unitID').exec();
            const unitName = lessons[0].unitID.name
            let lessonArray = []
            lessons.forEach(lesson => {
                const lessonsJson = {
                    _id: lesson._id,
                    lessonName: lesson.lessonName,
                    data: lesson.date
                }

                lessonArray.push(lessonsJson);
            })
            unitsArray.push({
                unitId,
                unitName,
                totalLessons: lessons.length,
                lessons: lessonArray
            })
        }

        return res.status(200).json({
            _id: studentId,
            name: studentName,
            registrationNumber: studentReg,
            totalUnits: studentUnits.length,
            units: unitsArray
        });

    }
    catch(error){
        return res.status(500).json({Error: "Internal server Error"});
    }

}


module.exports = getStudentLessons;