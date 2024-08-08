"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
//POST (/user/)
router.post('/', userController_1.registerUser);
//login
router.post('/login', userController_1.loginUser);
//GET (/user/)
exports.default = router;
