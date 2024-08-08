import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { JWT_SECRET_KEY } from '../../constants';

interface JwtPayload {
    userId: string;
    email: string;
  }


  declare global {
    namespace Express {
      interface Request {
        user?: any; // Adjust this type according to your User model
        token?: any;
        userId?: any;
      }
    }
  }
const authMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
   
      const token = req.header('Authorization');

      if(!token){
        return res
        .status(401)
        .json({message: "Unauthorized HTTP, token not provided"});
      }
      
      const jwtToken = token.replace("Bearer ", "").trim();
      console.log("token from middleware", jwtToken);


      try {
          // Adjust according to your JWT payload structure
        const isVerified = jwt.verify(jwtToken, JWT_SECRET_KEY!) as unknown as JwtPayload;
        // console.log("isVerified",isVerified);
        
        const userData = await User.findOne({email: isVerified.email}).select({
            password: 0,
        });
        console.log("user found",userData)
    
        if (!userData) {
          return res.status(401).json({ message: 'Unauthorized HTTP, invalid token' });
        }
    
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        // console.log(req.user)
        next();
      } catch (err) {
        return res.status(401).json({ message: 'Unauthorized HTTP, invalid token' });
      }
    };
    
    export default authMiddleware;
