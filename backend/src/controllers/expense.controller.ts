import { Request, Response } from "express";
import ExpenseModel, { IExpense } from "../models/expense.model";
import NotificationModel from "../models/notification.model";

export const addExpense = async (req: Request, res: Response) => {
	try {
		const { name, date, description, amount, category, receiptsUrls } =
			req.body;
		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const expense = new ExpenseModel({
			date,
			name,
			description,
			amount,
			category,
			receiptsUrls: [...receiptsUrls],
			userId,
		});

		await expense.save();

		res.status(201).json({
			isError: false,
			message: "Expense added successfully",
			expense,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};

export const getUserExpenses = async (req: Request, res: Response) => {
	try {
		let filter: any = {};
		if (req.query.status) {
			const statuses = Array.isArray(req.query.status)
				? req.query.status
				: [req.query.status];
			filter.status = { $in: statuses };
		}

		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const query = filter ? { userId, ...filter } : userId;
		const expenses = await ExpenseModel.find(query).populate({
			path: "userId",
			select: "name",
		});

		res.status(200).json({ isError: false, expenses });
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};

export const getAllExpenses = async (req: Request, res: Response) => {
	try {
		let filter: any = {};
		if (req.query.status) {
			const statuses = Array.isArray(req.query.status)
				? req.query.status
				: [req.query.status];
			filter.status = { $in: statuses };
		}

		const expenses = await ExpenseModel.find(filter).populate({
			path: "userId",
			select: "name",
		});

		res.status(200).json({ isError: false, expenses });
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};

export const updateExpense = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, date, description, amount, category, receiptsUrls } =
			req.body;

		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const expense = await ExpenseModel.findOne({ _id: id });

		if (!expense) {
			return res
				.status(404)
				.json({ isError: true, message: "Expense not found" });
		}

		if (expense.userId.toString() !== userId.toString()) {
			return res
				.status(403)
				.json({ isError: true, message: "Permission denied" });
		}

		if (
			expense.status !== "pending" &&
			expense.status !== "information-required"
		) {
			res.status(403).json({
				isError: true,
				message: "Cannot update approved or rejected expenses",
			});
			return;
		}

		const updatedExpense = await ExpenseModel.findOneAndUpdate(
			{ _id: id },
			{ name, date, description, amount, category, receiptsUrls },
			{ new: true }
		);

		if (!updatedExpense) {
			return res.status(500).json({
				isError: true,
				message: "Failed to update expense",
			});
		}

		res.status(200).json({
			isError: false,
			message: "Expense updated successfully",
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};

export const updateExpenseStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { status, requiredText } = req.body;

		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const expense = await ExpenseModel.findOneAndUpdate(
			{ _id: id },
			{ status },
			{ new: true }
		);

		if (!expense) {
			res.status(404).json({ isError: true, message: "Expense not found" });
			return;
		}

		// Send notification to the user if the status has changed
		await sendNotification(
			expense.userId,
			id,
			expense.name,
			status,
			requiredText
		);

		res.status(200).json({
			isError: false,
			message: "Expense updated successfully",
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};
const sendNotification = async (
	userId: string,
	expenseId: string,
	name: string,
	status: string,
	text: string = ""
) => {
	try {
		let notificationText = "";
		switch (status) {
			case "approved":
				notificationText = "Your expense claim has been approved.";
				break;
			case "rejected":
				notificationText = "Your expense claim has been rejected.";
				break;
			default:
				notificationText =
					text ||
					"Additional information is required for your expense claim.";
		}

		const notification = new NotificationModel({
			heading: `Expense Notification for ${name}`,
			text: notificationText,
			userId,
			expenseId,
		});
		await notification.save();
	} catch (error) {
		console.error("Error sending notification:", error);
	}
};

export const deleteExpense = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const userType = user?.userType;
		const userId = user?._id;

		if (!userId || !userType) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const expense = await ExpenseModel.findOne({ _id: id });

		if (!expense) {
			res.status(404).json({ isError: true, message: "Expense not found" });
			return;
		}

		// Check if user is the creator of the expense or a manager
		if (
			expense.userId.toString() !== userId.toString() &&
			userType !== "manager"
		) {
			res.status(403).json({ isError: true, message: "Permission denied" });
			return;
		}

		// Check if the expense is pending
		if (expense.status !== "pending") {
			res.status(403).json({
				isError: true,
				message: "Cannot delete approved or rejected expenses",
			});
			return;
		}

		await ExpenseModel.findByIdAndDelete(id);

		res.status(200).json({
			isError: false,
			message: "Expense deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};
