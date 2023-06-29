const UnitModel = require('../../models/unitModel')


const getAllUnits = async (req, res)=> {
    const lecturerId = req.body.lecturerId;

    try{
        const units = await UnitModel.find({lecturerId})

        return res.status(200).json({
            total: units.length,
            units
        })

    }
    catch(error){
        res.status(500).json({Error: "Internal Server Error"});
    }
}


module.exports = getAllUnits