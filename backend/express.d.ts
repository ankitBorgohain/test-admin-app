import User from "./src/models/userModel";
declare global {
    namespace Express {
      interface Request {
        user?: User; // or the type that matches your user model
      }
    }
  }