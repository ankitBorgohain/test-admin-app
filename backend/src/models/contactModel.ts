import mongoose from "mongoose";
const schema = mongoose.Schema;


//*****login schema ******//
const contactSchema = new schema(
    {
        name: {
            type:String,
            required: true,
    
        } ,
    email: {
        type:String,
        required: true,
        unique:true,
        index: true

    } ,
    message:{
        type:String,
        required: true,
    }
});

const Contact = mongoose.model("Contact", contactSchema)
export default Contact;