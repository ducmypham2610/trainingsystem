const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const Category = require("../model/categoryModel");

exports.add = async (req,res,next) => {
    const category = await Category.create(req.body);
    return res.status(201).json({
        status:"success",
        category
    })
}

exports.update = async(req,res,next) => {
    const category = await Category.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
      });
    if(!category) {
        console.log("no Category");
        return;
    }
    console.log(category);
    return res.status(200).json({
        status:"success",
        category
    })
}

exports.delete = async(req,res,next) => {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if(!category) {
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
    const category = await Category.findById(id);
    if(!category) {
        return res.status(204).json({
            status:"No content",
        })
    }

    return res.status(200).json({
        status:"success",
        category
    })
}

exports.getAll = async (req,res,next) => {
    const categories = await Category.find({});
    return res.status(200).json({
        status:"success",
        categories
    })
}