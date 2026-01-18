import mongoose, { mongo } from "mongoose";

const agent=new mongoose.Schema({
    agentName:{
        type:String,
        require:true
    },
    agentID:{
        type:String,
        require:true
    },
    complaints:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"complaints"
    }
});

export default mongoose.model("agents",agent,"agentCollection");