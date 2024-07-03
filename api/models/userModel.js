import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "please enter your username"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"please add email address"]
    },
    password:{
        type:String,
        required:[true, "add password"]
    }
},{timestamps:true})


const User = mongoose.model("User", userSchema);

export default User;