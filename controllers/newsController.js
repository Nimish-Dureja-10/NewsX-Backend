import newsModel from "../models/newsModel.js";
import userModel from "../models/userModel.js";
import fs from 'fs';

export const createNewsPost = async (req,res) => {
    try {
        //photo to be added
        const {title,description,category,source} = req.fields;
        const {photo} = req.files;
        if(!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message : "Please provide complete details",
            });
        }
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        const userId = await userModel.findById(req.user._id);
        const news = await newsModel.create({title,description,category,source,user:userId,photo:photo});
        // const addInUser = await userModel.findByIdAndUpdate(req.user._id,{post:[...userId.post,news._id]},{new : true});
        const addInUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { $push: { post: news._id } }, // Use $push to add news._id to the 'post' array
            { new: true }
          );
        res.status(201).json({
            success:true,
            addInUser
        });
    }catch(error) {
        res.status(500).json({
            success :false,
            message : 'Failed to create new news post',
            error
        });
    }
};

export const getAllNews = async (req,res) => {
    try {
        const news = await newsModel.find({});
        res.status(200).json({
            success:true,
            news
        });
    } catch (error) {
        res.status(404).json({
            success:false,
            message : "Failed to fetch all posted news",
            error
        });
    }
};

export const getUserNews = async (req,res) => {
    try {
        const userId = await userModel.findById(req.user._id).populate('post');
        res.status(200).json({
            success:true,
            userId,
        });
    } catch (error) {
        res.status(404).json({
            succes:false,
            message :"Failed to fetch your news",
            error
        });
    }
};