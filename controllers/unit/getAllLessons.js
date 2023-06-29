const UnitModel = require("../../models/unitModel")
const LessonModel = require('../../models/lessonModel');
const mongoose = require("mongoose")

const getAllLessons = async (req, res)=>{
    const unitID = req.params.unitId;

    try{
        let unitId;
        try{
            unitId = new mongoose.Types.ObjectId(unitID);
        }
        catch(error){
            return res.status(400).json({Error: "Invalid Unit Id"})
        }

        const existingUnitId = await UnitModel.findById({_id: unitId})

        if(!existingUnitId){
            return res.status(400).json({Error: "Unit Id Not Found"})
        }

        if(existingUnitId.lecturerId.toString() !== req.body.lecturerId){
            return res.status(400).json({Error: "Unit Id Not Found"});
        }

        const lessons = await LessonModel.find({unitID});

        return res.status(200).json({
            total: lessons.length,
            lessons
        })
    }
    catch(error){
        return res.status(500).json({Error: error.message});
    }
}

module.exports = getAllLessons;