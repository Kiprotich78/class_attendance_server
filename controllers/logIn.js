const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const logIn = async (req, res)=>{
    try{
        const {email, password} = req.body

        const existingUser = await User.findOne({email})

        if(!existingUser){
            return res.status(404).json({
                Error: "User not found"
            })
    
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordValid){
            return res.status(401).json({Error: "invalid password"})
        }

        const accessToken = jwt.sign({userId: existingUser._id}, "KIPROTICH");

        res.status(200).json({accessToken});

    }
    catch(error){
        res.status(500).json({Error: error.message})
    }


}

module.exports = logIn;