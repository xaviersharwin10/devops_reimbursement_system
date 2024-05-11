import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
	date: string;
	name: string;
	description: string;
	amount: number;
	category: string;
	receiptsUrls: [string];
	userId: string;
	status: "approved" | "pending" | "rejected" | "information-required";
}

const expenseSchema: Schema = new Schema(
	{
		date: {
			type: String,
			default: new Date(),
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		amount: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		receiptsUrls: [{
			type: String
		}
		],
		userId: {
			type: String,
			required: true,
			ref: "User",
		},
		status: {
			type: String,
			enum: ["approved", "pending", "rejected", "information-required"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const ExpenseModel = mongoose.model<IExpense>("Expense", expenseSchema);

export default ExpenseModel;
