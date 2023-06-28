const UnitModel = require('../models/unitModel');

const addUnit = async (req, res)=>{
    const {lecturerId, name} = req.body;

    try{
        if(!name){
            return res.status(400).json({Error: "Unit name is Required"})
        }

        const existingUnit = await UnitModel.findOne({name})

        if(existingUnit){
            return res.status(409).json({Error: "Unit already Exists"})
        }

        const unit = new UnitModel({
            lecturerId,
            name
        })

        const response = await unit.save()

        if(response){
            return res.status(201).json({
                msg: "Unit Added Successfully",
                unit: response
            })
        }

        res.status(500).json({Error: "Internal Server Error"});
        
    }
    catch(error){
        res.status(500).json({Error: "Internal Server Error"});
    }
}

module.exports = addUnit