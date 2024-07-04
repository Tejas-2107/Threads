import mongoose, { Schema, trusted } from "mongoose";
const User = new Schema({
    username: {
        type: String,
        requeired: true
    },
    email: {
        type: String,
        requeired: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: trusted
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.User || mongoose.model("User", User)