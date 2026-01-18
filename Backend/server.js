import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes.js";

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

app.use("/verifAI",routes);

// Default route for server health check
app.get('/', (req, res) => {
  res.send('VerifAI backend is running');
});

// Define PORT and start server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});