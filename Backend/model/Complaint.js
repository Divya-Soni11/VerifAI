import mongoose from "mongoose";

const complaint=new mongoose.Schema({
    customerName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customers"
    },
    restaurantName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurants"
    },
    agentName:{
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
    imageProof:{
        url: String,
        public_id: String
    }
}, {timestamps:true});

export default mongoose.model("complaints",complaint,"complaintCollection");