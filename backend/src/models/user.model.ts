import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	userType: "employee" | "manager";
}

const userSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	userType: {
		type: String,
		enum: ["manager", "employee"],
		default: "employee",
	},
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
