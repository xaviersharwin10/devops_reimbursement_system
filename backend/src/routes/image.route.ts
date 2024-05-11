import express from "express";
import { uploadImage } from "../controllers/image.controller";

const imageRouter = express.Router();

imageRouter.post("/upload", uploadImage);

export default imageRouter;
