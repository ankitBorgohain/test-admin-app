//send/recieve data to/from database via model

import { Request, Response, NextFunction } from "express"; 
import bcrypt from 'bcrypt';

import User from "../models/userModel";

// *________________________
//      Home Logic
// *________________________
                const home =async  (req: Request, res: Response) =>{
                    try{
                        res.status(200).send("welcome to worlds mern series Home page User")

                    }catch(error){
                        console.log(error)

                    }
                        
                };

// *________________________
//      Register Logic
// *________________________

        const registerUser = async (
                req: Request,
                res: Response,
                next: NextFunction
                ) => {
                try {
                    const { email } = req.body;

                    // console.log(req.body);

                    //if email already esixts -- validation
                    const userExists = await User.findOne({ email });
                        
                        if (userExists) {

                    
                            return res.status(400).json({message: "email already exists"});
                            }

                    //****HASHING password in controller with Bcrypt****        
                    //   const saltRounds = 10;
                    //   3 const passwordHash = await bcrypt.hash(password, saltRounds);

                        const user = new User(req.body);
                        // if(!user.name)throw({error: "name field required"})
                        const userCreated = await user.save();

                        res.status(201).json(
                            {
                                msg : "regestration successful", 
                                token: await userCreated.generateToken(),
                                userId: userCreated._id.toString(),   
                            } );    
                                                            
                } catch (error) {        
                    
                    // res.status(500).json(error);
                    next(error);
                }    
                };
             
// *________________________                
//      Login Logic
// *________________________

                const loginUser = async (req: Request, res: Response, next:NextFunction) => {
                    try {   
                            const { email, password} = req.body;
                            
                            
                            // console.log('Login attempt:', email, password ); 
                            const userExist = await User.findOne({email});
                            // console.log(userExist);

                            // console.log('User found:', userExist);
                            
                            if(!userExist){
                                return res.status(400).json({message: "Invalid Credentials"})
                            }    

                            const user = await userExist.comparePassword(password);
                            
                            if(user){
                                res.status(200).json(
                                    {
                                        msg : "Login successful", 
                                        token: await userExist.generateToken(),
                                        userId: userExist._id.toString(),   
                                    } );    
                            }else{    
                                res.status(401).json({message: "invalid email/password"})

                            }    
                                
                        
                    } catch (error) {    
                        // res.status(500).json("msg:  internal server error in login");
                        next(error);
                        
                    }    

                };    
            
// *________________________
//   to get user deta getUser Logic
// *________________________

  const getUser = async(req: Request, res: Response)=>{
    try {  
         const userData = req.user;
        //  console.log(userData);
         
        res.status(200).json({userData})
    } catch (error) {
        console.log(`Error from the user route ${error}`);
        
        
    }
  }
                
    export { registerUser, loginUser, home, getUser  };
