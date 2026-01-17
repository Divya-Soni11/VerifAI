import mongoose from "mongoose";

const customer=new mongoose.Schema({
    customerID:{
        type:String
    },
    userName:{
        type:String,
        reqiure:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    complaints:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'complaints'
    }
});

export default mongoose.model("customers",customer,"customerCollection");