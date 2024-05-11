import { Request, Response } from "express";
import NotificationModel from "../models/notification.model";

export const getUserNotifications = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const notifications = await NotificationModel.find({ userId });
		res.status(200).json({ isError: false, notifications });
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};

export const markAsReadNotification = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const notification = await NotificationModel.findOneAndUpdate(
			{ _id: id, userId },
			{ isRead: true },
			{ new: true }
		);

		if (!notification) {
			res.status(404).json({
				isError: true,
				message: "Notification not found",
			});
			return;
		}

		res.status(200).json({
			isError: false,
			message: "Notification marked as read",
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};

export const markAllAsReadNotifications = async (
	req: Request,
	res: Response
) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		await NotificationModel.updateMany({ userId }, { isRead: true });
		res.status(200).json({
			isError: false,
			message: "All notifications marked as read",
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};

export const deleteNotifications = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { ids } = req.body;
		if (!ids) {
			return res.status(400).json({
				isError: true,
				message: "Notification IDs are required",
			});
		}

		const notificationIds = ids.toString().split(",");

		const deleteResult = await NotificationModel.deleteMany({
			_id: { $in: notificationIds },
			userId,
		});

		res.status(200).json({
			isError: false,
			message: `${deleteResult.deletedCount} notifications deleted successfully`,
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: "Internal server error" });
	}
};
