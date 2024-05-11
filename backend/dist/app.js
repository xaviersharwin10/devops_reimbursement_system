"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const expense_route_1 = __importDefault(require("./routes/expense.route"));
const authentication_middlewares_1 = require("./middlewares/authentication.middlewares");
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const image_route_1 = __importDefault(require("./routes/image.route"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ limit: "100mb" }));
// Routers
app.use("/user", user_route_1.default);
app.use("/expense", authentication_middlewares_1.verifyToken, expense_route_1.default);
app.use("/notification", authentication_middlewares_1.verifyToken, notification_route_1.default);
app.use("/image", authentication_middlewares_1.verifyToken, image_route_1.default);
exports.default = app;
