import { NextFunction, Request, Response } from "express";
import { ADMIN_EMAIL } from "../../constants";

const adminMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    
    try {
        
        const isAdmin = req.user.email ===  ADMIN_EMAIL;
       
        
        if( !isAdmin ){
        
           return res
             .status(403)
             .json({message: "Access denied. User not an Admin"})
         }
        // console.log("user req for admin",req.user);
        next();
        
    } catch (error) {
        next(error);
        
    }
}

export default adminMiddleware;