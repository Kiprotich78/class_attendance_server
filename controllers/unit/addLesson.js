const UnitModel = require('../../models/unitModel');
const LessonModel = require('../../models/lessonModel');
const mongoose = require('mongoose')

const addLesson = async (req, res)=>{
    const {lessonName, date, startTime, duration} = req.body;
    const unitID = req.params.unitId;

    if(!lessonName || !date || !startTime || !duration){
        return res.status(400).json({Error: "All Fields are Required"});
    }

    try{
        const checkUnitId = await UnitModel.findOne({ _id: new mongoose.Types.ObjectId(unitID) });

        if(!checkUnitId){
            return res.status(400).json({Error: "Invalid Unit Id"});
        }
        const existingLessons = await LessonModel.find({unitID});

        if(existingLessons.some(lesson => lesson.lessonName === lessonName)){
            return res.status(409).json({Error: "Lesson Already Exists"})
        }

        const toISOString = validateDate(date);

        if(!toISOString){
            return res.status(400).json({Error: "Invalid Date"})
        }

        const lesson = new LessonModel({
            lessonName,
            unitID,
            date: toISOString,
            startTime,
            duration
        })

        const addedLesson = await lesson.save();


        if(addedLesson){
            return res.status(201).json({
                msg: "lesson added successfully",
                lesson: addedLesson
            })    
        }

        return res.status(500).json({Error: "Internal Server Error"});

    }
    catch(error){
        return res.status(500).json({Error: "Server Error"});
    }
}

function validateDate(dateString) {
    const date = new Date(dateString);
    if (!isNaN(date)) {
      return date.toISOString();
    }
  
    return false;
  }
  


module.exports = addLesson;