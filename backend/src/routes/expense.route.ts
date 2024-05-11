import express from "express";
import {
	addExpense,
	deleteExpense,
	getAllExpenses,
	getUserExpenses,
	updateExpense,
	updateExpenseStatus,
} from "../controllers/expense.controller";
import { verifyToken } from "../middlewares/authentication.middlewares";
import { verifyUserType } from "../middlewares/authorization.middleware";

const expenseRouter = express.Router();

expenseRouter.post("/add-expense", addExpense);
expenseRouter.get("/get-user-expenses", getUserExpenses);
expenseRouter.get("/get-all-expenses", verifyUserType, getAllExpenses);
expenseRouter.put("/update-expense/:id", updateExpense);
expenseRouter.put(
	"/update-expense-status/:id",
	verifyUserType,
	updateExpenseStatus
);
expenseRouter.delete("/delete-record/:id", deleteExpense);

export default expenseRouter;
