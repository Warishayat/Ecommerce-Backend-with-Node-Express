const { UserModel } = require("../Models/User");
const dotenv =  require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Signup = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body
    const finduser = await UserModel.findOne({email})
    if(finduser){
        return res.status(409).json({
            success:false,
            message : "User already found.Login now"
        })
        }
        const hash_pass = await bcrypt.hash(password,10)
        const newuser = new UserModel({name,email,password:hash_pass,role})
        newuser.save();
        return res.status(201).json({
            success:true,
            message:"User Created Successfully."
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error. Try again later"
        })
    }
}

const Login = async(req,res)=>{
    try {
        const {email,password,role} = req.body
        const find_user  = await UserModel.findOne({email})
        if(!find_user){
            return res.status(409).json({
                success:false,
                message : "Invalid Credentials, Try with some diffrent account."
            })
        }
        const compare_pass = await bcrypt.compare(password,find_user.password)
        if(!compare_pass){
            return res.status(401).json({
                success:false,
                message : "Invalid Credentials, Try with some diffrent account."
            })
        }
        const token = jwt.sign(
            {email:find_user.email,_id:find_user._id,role:find_user.role},
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        return res.status(201).json({
            success:true,
            token,
            "email" : find_user.name,
        })
    }catch(error) {
        return res.status(500).json({
            success:false,
            message : "Internel Server Error. Try again later"
        })
        
    }
}
module.exports = {Signup,Login}