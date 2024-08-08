"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = exports.registerAdmin = void 0;
const loginModel_1 = __importDefault(require("../models/loginModel"));
//register admin
const registerAdmin = async (req, res, next) => {
    console.log(req.body);
    const login = new loginModel_1.default(req.body);
    login.save();
    res.send("Admin Registration done");
};
exports.registerAdmin = registerAdmin;
//login admin
const getAdmin = (req, res, next) => {
    console.log("Admin 1  Login ....");
    res.send("Admin 1  Loegged in ");
};
exports.getAdmin = getAdmin;
