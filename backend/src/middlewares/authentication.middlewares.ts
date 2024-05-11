import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey: string = process.env.jwt_secret_key!;

// Extend the Request type to include the user property
declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("Authorization")?.split(" ")[0];

	if (!token) {
		return res
			.status(401)
			.json({ isError: true, message: "No token, authorization denied" });
	}

	try {
		const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
		const { userId } = decoded;

		// Check if the user exists
		const user = await UserModel.findById(userId);
		if (!user) {
			return res
				.status(401)
				.json({ isError: true, message: "Unauthorized" });
		}

		// Attach the user to the request object
		req.user = user;

		next();
	} catch (err) {
		res.status(401).json({ isError: true, message: "Invalid token", err });
	}
};
