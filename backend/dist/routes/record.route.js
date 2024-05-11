"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const record_controller_1 = require("../controllers/record.controller");
const authentication_middlewares_1 = require("../middlewares/authentication.middlewares");
const recordRouter = express_1.default.Router();
recordRouter.get("/get-records", authentication_middlewares_1.verifyToken, record_controller_1.getRecords);
recordRouter.post("/add-record", authentication_middlewares_1.verifyToken, record_controller_1.addRecord);
recordRouter.delete("/delete-record/:id", authentication_middlewares_1.verifyToken, record_controller_1.deleteRecord);
exports.default = recordRouter;
