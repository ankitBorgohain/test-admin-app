require("dotenv").config();
import express from "express";
const cors = require('cors')


import UserRoute from "./src/routes/userRoute";
import ServiceRoute from "./src/routes/serviceRoute";
import ContactRoute from "./src/routes/contactRoute";
import AdminRoute from "./src/routes/adminRoute"
import { connectToDb } from "./db";
import  { errorMiddleware } from "./src/middlewares/error-middleware";
import adminMiddleware from "./src/middlewares/admin-middleware";
import { PORT } from "./constants";

const app = express();

//handling cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());

app.use("/", (req,res)=>res.status(200).json({message: "hello from server"}))
//Admin Route
app.use("/api/admin", AdminRoute)

//Redirect /user to UserRouter
app.use("/api/auth", UserRoute);

//Redirect to contact form
app.use("/api/form", ContactRoute);

//To GET the services data from backend
app.use("/api/data", ServiceRoute);


//error middleware
app.use(errorMiddleware);


// connectiong to db >> connection establised at port 
connectToDb().then(() => {app.listen(PORT, () => {
    console.log("Server running at port " + PORT);
  });
});
