"use strict";
//send/recieve data to/from database via model
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// register user
const registerUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        // console.log(req.body);
        //if email already esixts -- validation
        const userExists = await userModel_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json("msg: email already exists");
        }
        //****HASHING password in controller with Bcrypt****
        //   const saltRounds = 10;
        //   3 const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = new userModel_1.default(req.body);
        const userCreated = await user.save();
        res.status(201).json({
            msg: "regestration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    }
    catch (error) {
        res.status(500).json("msg:  internal server error");
    }
};
exports.registerUser = registerUser;
//user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', email, password);
        const userExist = await userModel_1.default.findOne({ email });
        console.log(userExist);
        console.log('User found:', userExist);
        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const user = await userExist.comparePassword(password);
        if (user) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else {
            res.status(401).json("message: invalid email/password");
        }
    }
    catch (error) {
        res.status(500).json("msg:  internal server error in login");
    }
};
exports.loginUser = loginUser;
const getUser = (req, res) => {
    console.log("User Info .....user 1");
    res.send("User 1 info");
};
exports.getUser = getUser;
