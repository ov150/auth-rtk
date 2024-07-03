import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;
    const existUser = await User.findOne({email});
    
    if(existUser){
        res.status(400).json({
            message:"user already exist"
        })
    }    
    const user = await User.create({
        username,
        email,
        password
    });
    
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }
    return res.status(201).json({
        message:"User created successfully",
        user
    }) 
})

const loginUser = asyncHandler(async(req, res)=>{
    const { email, password} = req.body;
    const user = await User.findOne({email})

    if(user.password !== password){
        return res.json({
            message:"invalid user password"
        })
    }
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error("invalid email and password")
    }

})

const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export {
    loginUser,
    registerUser,
    getUserProfile,
    logoutUser
}