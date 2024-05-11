import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecretKey: string = process.env.jwt_secret_key!;

export const getUser = async (req: Request, res: Response) => {
	const userId = req.params.id;

	try {
		const user = await UserModel.findById(userId);

		if (!user) {
			return res
				.status(404)
				.json({ isError: true, message: "User not found" });
		}

		res.status(200).json({ isError: false, user });
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
};

export const userRegister = async (req: Request, res: Response) => {
	const { email, password, name, userType } = req.body;
	try {
		let user = await UserModel.findOne({ email });
		let firstName = name.split(" ")[0].toLowerCase();
		let tag = `@${firstName}${Math.floor(1000 + Math.random() * 9000)}`;
		if (user) {
			return res.status(201).json({
				isError: true,
				message: "Email already used in this website.",
			});
		}
		bcrypt.hash(password, 5, async (err:any, hash:any) => {
			if (err) throw err;
			const user = new UserModel({ email, password: hash, name, tag, userType });
			await user.save();
			res.status(201).json({
				isError: false,
				message: "Welcome to our website",
				token: jwt.sign({ userId: user?._id }, jwtSecretKey),
				user,
			});
		});
	} catch (error: any) {
		res.status(404).json({ isError: true, message: error.message });
	}
};

export const userLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		let user: IUser | null = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(404)
				.json({ isError: true, message: "User not found" });
		}
		bcrypt.compare(password, user.password, (err:any, result:any) => {
			if (result) {
				res.status(200).json({
					isError: false,
					message: "Welcome Back to our website",
					token: jwt.sign({ userId: user?._id }, jwtSecretKey),
					user,
				});
			} else {
				res.status(401).json({
					isError: true,
					message: "Invalid password",
				});
			}
		});
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ isError: true, message: error.message });
	}
};