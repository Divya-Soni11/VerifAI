import mongoose from "mongoose";

const restaurant=new mongoose.Schema({
    resName:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    complaints:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"complaints"
    }
});

export default mongoose.model("restaurants",restaurant,"restaurantCollection");