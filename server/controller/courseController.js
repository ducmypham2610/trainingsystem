const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const Course = require("../model/courseModel");

exports.addCourse = async (req,res,next) => {
    const course = await Course.create(req.body);
    return res.status(201).json({
        status:"success",
        course
    })
}

exports.updateCourse = async(req,res,next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
      });
    if(!course) {
        console.log("no course");
        return;
    }
    console.log(course);
    return res.status(200).json({
        status:"success",
        course
    })
}

exports.deleteCourse = async(req,res,next) => {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete(id);
    if(!course) {
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
    const course = await Course.findById(id);
    if(!course) {
        return res.status(204).json({
            status:"No content",
        })
    }

    return res.status(200).json({
        status:"success",
        course
    })
}

exports.getAll = async (req,res,next) => {
    const filter = {}
    const courses = await Course.find(filter);
    return res.status(200).json({
        status:"success",
        courses
    })
}
