import mongoose from "mongoose";

const complaint=new mongoose.Schema({
    customerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customers",
        require:true
    },
    restaurantID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurants"
    },
    agentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"agents"
    },
    refundReason:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    imageProof:[{
        type:String
    }]
}, {timestamps:true});

export default mongoose.model("complaints",complaint,"complaintCollection");