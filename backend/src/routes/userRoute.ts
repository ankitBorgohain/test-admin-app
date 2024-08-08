import express from 'express';

import {registerUser, loginUser, home, getUser} from '../controllers/userController'
import  {signupSchema, loginSchema } from '../validators/auth-validator';
import { validate } from '../middlewares/validate-middleware';
import authMiddleware from "../middlewares/auth-middleware"


const router = express.Router();

//get req
router.get("/",home)

//post req
router.post('/register', validate(signupSchema), registerUser);


//login
router.post('/login',validate(loginSchema), loginUser);

//GET (/user/)

router.get('/user', authMiddleware, getUser);


export default router ;