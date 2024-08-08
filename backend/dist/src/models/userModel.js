"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const schema = mongoose.Schema;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    console.log(this);
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    try {
        const saltRounds = 10;
        const hash_Password = await bcrypt_1.default.hash(user.password, saltRounds);
        user.password = hash_Password;
        next();
    }
    catch (error) {
        next(error);
    }
});
//Compare password using bcrypt
userSchema.methods.comparePassword = async function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
//****JWT TOKEN with methods  */
userSchema.methods.generateToken = async function () {
    try {
        //to check if JWT key is !null
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({
            userId: this._id.toString(),
            email: this.email,
            password: this.password,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
        console.log('Generated token:', token);
        return token;
    }
    catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};
//create the user model
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
