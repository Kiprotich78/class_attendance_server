const StudentsUnitModel = require('../models/studentUnitsModel')
const StudentModel = require('../models/studentModel')
const UnitModel  = require('../models/unitModel');
const mongoose = require('mongoose')

const addStudentUnit = async (req, res)=>{
    const {lecturerId, unitID } = req.body;
    const studentId = req.params.studId;
    if(!unitID){
        return res.status(400).json({Error: "Unit ID is required"})
    }
    try{
        const availableStudent = await StudentModel.find({lecturerId});
        if(!availableStudent.some(student => student.lecturerId === lecturerId)){
            return res.status(400).json({Error: "Student Not Found"})
        }

        console.log(availableStudent, lecturerId);
        const availableUnit = await UnitModel.findById({_id: new mongoose.Types.ObjectId(unitID)})
        if(!availableUnit){
            return res.status(400).json({Error: "Invalid Unit id"});
        }

        const existingUnit = await StudentsUnitModel.find({student: studentId})
        if(existingUnit.some(unit => unit.unit === unitID)){
            return res.status(409).json({Error: 'Student is already enrolled to this unit'});
        }

        const unit = new StudentsUnitModel({
            student: studentId,
            unit: unitID
        })

        const addedUnit = await unit.save()

        if(addedUnit){
            res.status(201).json({
                msg: "unit added successfully",
                unit: addedUnit
            })
        }

    }
    catch(error){
        return res.status(500).json({Error: error.message});
    }

}

module.exports = addStudentUnit;