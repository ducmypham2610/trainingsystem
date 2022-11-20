const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const Topic = require("../model/topicModel");

exports.add = async (req,res,next) => {
    const topic = await Topic.create(req.body);
    return res.status(201).json({
        status:"success",
        topic
    })
}

exports.update = async(req,res,next) => {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
      });
    if(!topic) {
        console.log("no Topic");
        return;
    }
    console.log(topic);
    return res.status(200).json({
        status:"success",
        topic,
    });
}

exports.delete = async(req,res,next) => {
    const id = req.params.id;
    const topic = await Topic.findByIdAndDelete(id);
    if(!topic) {
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
    const topic = await Topic.findById(id);
    if(!topic) {
        return res.status(204).json({
            status:"No content",
        })
    }

    return res.status(200).json({
        status:"success",
        topic
    })
}

exports.getAll = async (req,res,next) => {
    const topics = await Topic.find({});
    return res.status(200).json({
        status:"success",
        topics
    })
}