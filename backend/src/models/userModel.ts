import mongoose, {Schema} from "mongoose";
// const schema = mongoose.Schema;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../constants";


// interface for usre
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  generateToken: () => string;
  comparePassword:(password: string) =>string;
  isModified: (path: string) => boolean;
}


//schema
const userSchema: Schema<IUser> = new Schema(
  {
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
    
  },
  { timestamps: true }
);


//hashing the password and saving it to the db
userSchema.pre("save", async function (next) {
  console.log(this);
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    const saltRounds = 10;
    const hash_Password = await bcrypt.hash(user.password, saltRounds);
    user.password = hash_Password;
    next();
  } catch (error) {
    next(error as Error);
  }
});

//Compare password using bcrypt

userSchema.methods.comparePassword = async function(password:string) {
  return bcrypt.compare(password, this.password);
}

//****JWT TOKEN with methods  */
userSchema.methods.generateToken = async function () {
  try {
    
    
    //to check if JWT key is !null
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const token = jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                
            },

            JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            });
            console.log('Generated token:', token); 
            return token;
            

  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};


//create the user model
const User = mongoose.model("User", userSchema);


export default User;
