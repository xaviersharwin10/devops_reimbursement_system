"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("../controllers/expense.controller");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const expenseRouter = express_1.default.Router();
expenseRouter.post("/add-expense", expense_controller_1.addExpense);
expenseRouter.get("/get-user-expenses", expense_controller_1.getUserExpenses);
expenseRouter.get("/get-all-expenses", authorization_middleware_1.verifyUserType, expense_controller_1.getAllExpenses);
expenseRouter.put("/update-expense/:id", expense_controller_1.updateExpense);
expenseRouter.put("/update-expense-status/:id", authorization_middleware_1.verifyUserType, expense_controller_1.updateExpenseStatus);
expenseRouter.delete("/delete-record/:id", expense_controller_1.deleteExpense);
exports.default = expenseRouter;
