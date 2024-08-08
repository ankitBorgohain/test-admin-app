import { Request, Response } from "express";
import Service from "../models/serviceModel";

const getService = async ( req:Request, res: Response) =>{
    try {
        const response = await Service.find();
        console.log("sever-response",response);
        
        if(!response){
            res.status(400).json({msg: "no service found"});
            return;
        }
        res.status(200).json(response)
    } catch (error) {
        console.log("error at services controller",error);
        
    }
};

export {getService}
