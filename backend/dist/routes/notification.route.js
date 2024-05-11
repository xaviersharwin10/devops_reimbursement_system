"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const notificationRouter = express_1.default.Router();
notificationRouter.get("/user-notifications", notification_controller_1.getUserNotifications);
notificationRouter.put("/mark-as-read/:id", notification_controller_1.markAsReadNotification);
notificationRouter.put("/mark-all-as-read", notification_controller_1.markAllAsReadNotifications);
notificationRouter.delete("/delete-notifications/", notification_controller_1.deleteNotifications);
exports.default = notificationRouter;
