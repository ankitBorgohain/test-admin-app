"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.MONGODB_URI;
async function connectToDb() {
    if (!URI) {
        console.error("MONGODB_URI environment variable is not defined");
        process.exit(1); // Exit with a non-zero status code to indicate failure
    }
    try {
        await mongoose_1.default.connect(URI);
        console.log("Connected to the database");
    }
    catch (e) {
        console.log("Error connecting database :: ", e);
        process.exit(1);
    }
}
;
