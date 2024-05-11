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
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./configs/database"));
const cloudinary_connection_1 = require("./configs/cloudinary.connection");
const PORT = process.env.PORT || 7171;
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default;
        yield cloudinary_connection_1.cloudinaryConnection;
        console.log("Connected to Database and Cloudinary");
    }
    catch (error) {
        console.log(error);
        console.log("Unable to connect to Database");
    }
    console.log(`Server is running on port ${process.env.port}`);
}));
