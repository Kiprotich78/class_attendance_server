const bcrypt = require('bcrypt');
const Lecturer = require('../models/lecturerModel');
const jwt = require('jsonwebtoken');

const logIn = async (req, res)=>{
    try{
        const {email, password} = req.body

        const existingUser = await Lecturer.findOne({email})

        if(!existingUser){
            return res.status(404).json({
                Error: "User not found"
            })
    
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordValid){
            return res.status(401).json({Error: "invalid password"})
        }

        const accessToken = jwt.sign({userId: existingUser._id}, process.env.SECRET_KEY);

        res.status(200).json({accessToken});

    }
    catch(error){
        res.status(500).json({Error: error.message})
    }


}

module.exports = logIn;