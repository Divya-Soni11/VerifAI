import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// import routes from "";

import cloudinary from "cloudinary";
import {cloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();
const app=express();

app.use(bodyParser.json());
const PORT=process.env.PORT||3000;
const MongoURI=process.env.MONGOURI;

const connect=()=>{mongoose.connect(MongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    tls:true
}).then(()=>{

    console.log("database connected successfully!");

    app.listen(PORT,()=>{
        console.log(`Server listening on Port: ${PORT}`);
    });

}).catch((error)=>{

    console.log("Database connection failed!");
    console.error(error);
})
}

connect();

const allowedOrigins=["https://localhost:3000","https://localhost:5500"];
app.use(cors({
    origin:function(origin,callback){
        if(!origin||allowedOrigins.includes(origin)){
            callback(null,true);
        }else{
            callback(new Error("Origin not allowed by CORS!"));
        }
    }
}));


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'complaint_Images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };

// app.use("/refundPortal",routes);