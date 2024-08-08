import { NextFunction, Request, Response } from "express";

import User from "../models/userModel";
import Contact from "../models/contactModel";
import Service from "../models/serviceModel";

// *________________________
//      Get All Services Logic
// *________________________
const getAllServices = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const services = await Service.find({},{});
        if(!services){
            return res.status(404).json({message: "No Services found"})
        }
        // console.log("aall the users contorller",users);
        
        return res.status(200).json(services)
    } catch (error) {
        console.log("error at contorller",error);
        
        next(error);
    }
} 

// *________________________
//      Get All Users Logic
// *________________________
const getAllUsers = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const users = await User.find({},{password:0});
        if(!users){
            return res.status(404).json({message: "No users found"})
        }
        // console.log("aall the users contorller",users);
        
        return res.status(200).json(users)
    } catch (error) {
        console.log("error at contorller",error);
        
        next(error);
    }
} 

// *________________________
//      Get UserById Logic
// *________________________

const getUserById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id}, {password: 0})
        return res.status(200).json({data})
        
    } catch (error) {
        next(error);
    }
}
// *_____________________________ 
//  update User Details by ID Logic
// *______________________________

const updateUserById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const updatedDetails = req.body;
        const updatedData = await User.updateOne({_id:id}, {
            $set: updatedDetails,
        })
        return res.status(200).json({updatedData})

    } catch (error) {
        next(error);
    }
}
// *________________________
//      Delete User Logic
// *________________________

const deleteUserById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id})
        return res.status(200).json({message: "User deleted successfully"})

    } catch (error) {
        next(error);
    }
}

// *________________________
//      Get all messages Logic
// *________________________
const getMessages = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const messages = await Contact.find();
        if(!messages){
            return res.status(404).json({message: "No messages found"})
        }
        return res.status(200).json(messages)
    } catch (error) {
        next(error);
    }
} 

const deleteMessage = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const id = req.params.id;
        console.log(id);
        
        await Contact.deleteOne({_id: id})
        return res.status(200).json({message: "Message deleted successfully"})

    }catch(error){
        next(error);
    }
}




export { 
    getAllUsers, 
    getMessages, 
    deleteUserById, 
    getUserById , 
    updateUserById, 
    deleteMessage,
    getAllServices
};