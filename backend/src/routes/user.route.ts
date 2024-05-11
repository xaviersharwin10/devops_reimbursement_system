import express from "express";
import { verifyToken } from "../middlewares/authentication.middlewares";
import {
	getUser,
	userLogin,
	userRegister,
} from "../controllers/user.controller";

const userRouter = express.Router();

// Get user
userRouter.get("/get/:id", verifyToken, getUser);

// Register route
userRouter.post("/register", userRegister);

// Login route
userRouter.post("/login", userLogin);

export default userRouter;
