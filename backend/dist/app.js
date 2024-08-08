"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./src/routes/userRoute"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Redirect /user to UserRouter
app.use("/user", userRoute_1.default);
// app.use("/login", LoginRoute);
const PORT = 5000;
(0, db_1.connectToDb)().then(() => {
    app.listen(PORT, () => {
        console.log("Server running at port " + PORT);
    });
});
