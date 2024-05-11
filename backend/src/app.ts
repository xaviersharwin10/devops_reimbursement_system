import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";

import userRouter from "./routes/user.route";
import expenseRouter from "./routes/expense.route";
import { verifyToken } from "./middlewares/authentication.middlewares";
import notificationRouter from "./routes/notification.route";
import imageRouter from "./routes/image.route";

const app = express();

// Middleware
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileupload({
		useTempFiles: true,
	})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

// Routers
app.use("/user", userRouter);
app.use("/expense", verifyToken, expenseRouter);
app.use("/notification",verifyToken, notificationRouter);
app.use("/image", verifyToken, imageRouter)

export default app;
