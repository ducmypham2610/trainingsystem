const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const User = require("../model/userModel");

exports.addUser = async (req,res,next) => {
    const {name,email,dob,gender,address,role} = req.body;
    const id = uuidv4();
    const data = {id,name,email,dob,gender,address,role};

    // Insert into User values()
    const user = await User.create(data);
    return res.status(201).json({
        status:"success",
        user
    })
}

exports.updateUser = async(req,res,next) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
      });
    if(!user) {
        console.log("no user");
        return;
    }
    console.log(user);
    return res.status(200).json({
        status:"success",
        user
    })
}

exports.deleteUser = async(req,res,next) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if(!user) {
        return res.status(204).json({
            status:"No content",
        })
    }

    return res.status(200).json({
        status:"Deleted successfully !"
    })
}

exports.getById = async(req,res,next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) {
        return res.status(204).json({
            status:"No content",
        })
    }

    return res.status(200).json({
        status:"success",
        user
    })
}

exports.getAll = async (req,res,next) => {
    const users = await User.find({});
    return res.status(200).json({
        status:"success",
        users
    })
}