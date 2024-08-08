import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";

const URI = MONGODB_URI;

  const connectToDb = async ()=> {
    

    if (!URI) {
        console.error("MONGODB_URI environment variable is not defined");
        process.exit(1); // Exit with a non-zero status code to indicate failure
      }

    try {
      const conn = await mongoose.connect(URI);
      console.log("Connected to the database");


    } catch (e) {
      console.log("Error connecting database :: ", e);
      process.exit(1);
    }
    
  };

  export {connectToDb};
  