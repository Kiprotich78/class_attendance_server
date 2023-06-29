const StudentUnitsModel = require('../../models/studentUnitsModel')
const StudentModel = require('../../models/studentModel');
const mongoose = require('mongoose');

const getStudentsUnits = async (req, res)=>{
    const studentId = req.params.studId;

    try{
        let studId;
        try{
            studId = new mongoose.Types.ObjectId(studentId);
        }
        catch(error){
            return res.status(400).json({Error: "Invalid Student Id"});
        }

        const existingStudent = await StudentModel.findById({_id: studId})
        if(!existingStudent){
            return res.status(400).json({Error: "Student not found in our database"})
        }

        if(existingStudent.lecturerId.toString() !== req.body.lecturerId){
            return res.status(400).json({Error: "Student not found"})
        }

        const units = await StudentUnitsModel.find({student: studentId}).populate('unit').exec();
        

        return res.status(400).json({
            total: units.length,
            units
        })


    }
    catch(error){
        return res.status(500).json({Error: error.message})
    }
}

module.exports = getStudentsUnits;