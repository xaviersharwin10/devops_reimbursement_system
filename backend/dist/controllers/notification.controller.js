"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotifications = exports.markAllAsReadNotifications = exports.markAsReadNotification = exports.getUserNotifications = void 0;
const notification_model_1 = __importDefault(require("../models/notification.model"));
const getUserNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const notifications = yield notification_model_1.default.find({ userId });
        res.status(200).json({ isError: false, notifications });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.getUserNotifications = getUserNotifications;
const markAsReadNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { id } = req.params;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const notification = yield notification_model_1.default.findOneAndUpdate({ _id: id, userId }, { isRead: true }, { new: true });
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
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.markAsReadNotification = markAsReadNotification;
const markAllAsReadNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        yield notification_model_1.default.updateMany({ userId }, { isRead: true });
        res.status(200).json({
            isError: false,
            message: "All notifications marked as read",
        });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.markAllAsReadNotifications = markAllAsReadNotifications;
const deleteNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
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
        const deleteResult = yield notification_model_1.default.deleteMany({
            _id: { $in: notificationIds },
            userId,
        });
        res.status(200).json({
            isError: false,
            message: `${deleteResult.deletedCount} notifications deleted successfully`,
        });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.deleteNotifications = deleteNotifications;
