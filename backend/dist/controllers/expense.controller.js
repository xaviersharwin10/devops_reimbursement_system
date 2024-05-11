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
exports.deleteExpense = exports.updateExpenseStatus = exports.updateExpense = exports.getAllExpenses = exports.getUserExpenses = exports.addExpense = void 0;
const expense_model_1 = __importDefault(require("../models/expense.model"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, date, description, amount, category, receiptsUrls } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const expense = new expense_model_1.default({
            date,
            name,
            description,
            amount,
            category,
            receiptsUrls: [...receiptsUrls],
            userId,
        });
        yield expense.save();
        res.status(201).json({
            isError: false,
            message: "Expense added successfully",
            expense,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.addExpense = addExpense;
const getUserExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let filter = {};
        if (req.query.status) {
            const statuses = Array.isArray(req.query.status)
                ? req.query.status
                : [req.query.status];
            filter.status = { $in: statuses };
        }
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const query = filter ? Object.assign({ userId }, filter) : userId;
        const expenses = yield expense_model_1.default.find(query).populate({
            path: "userId",
            select: "name",
        });
        res.status(200).json({ isError: false, expenses });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.getUserExpenses = getUserExpenses;
const getAllExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filter = {};
        if (req.query.status) {
            const statuses = Array.isArray(req.query.status)
                ? req.query.status
                : [req.query.status];
            filter.status = { $in: statuses };
        }
        const expenses = yield expense_model_1.default.find(filter).populate({
            path: "userId",
            select: "name",
        });
        res.status(200).json({ isError: false, expenses });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.getAllExpenses = getAllExpenses;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id } = req.params;
        const { name, date, description, amount, category, receiptsUrls } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const expense = yield expense_model_1.default.findOne({ _id: id });
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
        if (expense.status !== "pending" &&
            expense.status !== "information-required") {
            res.status(403).json({
                isError: true,
                message: "Cannot update approved or rejected expenses",
            });
            return;
        }
        const updatedExpense = yield expense_model_1.default.findOneAndUpdate({ _id: id }, { name, date, description, amount, category, receiptsUrls }, { new: true });
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
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.updateExpense = updateExpense;
const updateExpenseStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { id } = req.params;
        const { status, requiredText } = req.body;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const expense = yield expense_model_1.default.findOneAndUpdate({ _id: id }, { status }, { new: true });
        if (!expense) {
            res.status(404).json({ isError: true, message: "Expense not found" });
            return;
        }
        // Send notification to the user if the status has changed
        yield sendNotification(expense.userId, id, expense.name, status, requiredText);
        res.status(200).json({
            isError: false,
            message: "Expense updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.updateExpenseStatus = updateExpenseStatus;
const sendNotification = (userId_1, expenseId_1, name_1, status_1, ...args_1) => __awaiter(void 0, [userId_1, expenseId_1, name_1, status_1, ...args_1], void 0, function* (userId, expenseId, name, status, text = "") {
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
        const notification = new notification_model_1.default({
            heading: `Expense Notification for ${name}`,
            text: notificationText,
            userId,
            expenseId,
        });
        yield notification.save();
    }
    catch (error) {
        console.error("Error sending notification:", error);
    }
});
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const userType = user === null || user === void 0 ? void 0 : user.userType;
        const userId = user === null || user === void 0 ? void 0 : user._id;
        if (!userId || !userType) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const expense = yield expense_model_1.default.findOne({ _id: id });
        if (!expense) {
            res.status(404).json({ isError: true, message: "Expense not found" });
            return;
        }
        // Check if user is the creator of the expense or a manager
        if (expense.userId.toString() !== userId.toString() &&
            userType !== "manager") {
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
        yield expense_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            isError: false,
            message: "Expense deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.deleteExpense = deleteExpense;
