import mongoose from "mongoose";
const schema = mongoose.Schema;


const serviceSchema = new schema({
    service:{
        type:String,
        required: true,
    }, 
    description:{
        type:String,
        required: true,
    }, 
    price:{
        type:String,
        required: true,
    },
    provider:{
        type:String,
        required: true,
    }

})

const Service = mongoose.model("Service", serviceSchema);
export default Service;
