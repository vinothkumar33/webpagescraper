import mongoose from 'mongoose'

const Schema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    wordcount:{
        type:Number,
        required:true
    },
    favourite:{
        type:Boolean,
        default:false
    },


})

const UserModel=mongoose.model('users',Schema);

export default UserModel;