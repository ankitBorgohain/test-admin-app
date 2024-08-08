import { NextFunction, Request, Response } from "express";

export interface CustomError extends Error{
    status : number,
    extraDetails?: string
}
 const errorMiddleware = (err: CustomError,  req: Request, res: Response, next:NextFunction) =>{
    const status = err.status || 500;
    const message = err.message || "Backend Error Message";
    const extraDetails = err.extraDetails || "Error at Backend";

    return res.status(status).json({message, extraDetails});
} 
export {errorMiddleware};