const QrCode = require('qrcode')
const UnitModel = require('../models/unitModel');
const LessonModel = require('../models/lessonModel')
const { mongoose } = require('mongoose');

const generateQRcode = async (req, res)=>{
    try {
        const unitID = req.query.unitId; 
        const lessonID = req.query.lessonId; 

        let unitId, lessonId;

        try{
            unitId = new mongoose.Types.ObjectId(unitID)
            lessonId = new mongoose.Types.ObjectId(lessonID)

        }
        catch(error){
            console.log(error)
            return res.status(400).json({Error: "Unit id or lesson id is invalid"});
        }

        if(!unitID || !lessonID){
            return res.status(400).json({Error: "Both unit id and lesson id are required"})
        }

        const existingUnit = await UnitModel.findById({_id: unitId});
        if(!existingUnit){
            return res.status(400).json({Error: "Unit not available in our database"})
        }

        const existingLesson = await LessonModel.findById({_id: lessonId});
        if(!existingLesson){
            return res.status(400).json({Error: "Lesson not available in our database"})
        }

        const jsonData = {unitID, lessonID};
        const jsonText = JSON.stringify(jsonData);

        const url = await QrCode.toDataURL(jsonText);
    
        res.send({
            msg: "success", 
            imgUrl: url, 
            htmlImgUrl: `<img src="${url}" alt="QR Code" />`
        });

    } catch (err) {
        res.status(500).send({Error: 'Internal Server Error'});
    }
}

module.exports = generateQRcode;
