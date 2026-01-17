import { signUp, login, raiseComplaint } from "../controller/controller.js";
import { upload } from "../model/multerMidWare.js";
import express from "express";

const routes=express.Router();

routes.post("/signup",signUp);
routes.post("/login",login);
routes.post("/complaint",upload.array('images',5),raiseComplaint);

export default routes;