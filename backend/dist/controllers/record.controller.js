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
exports.deleteRecord = exports.addRecord = exports.getRecords = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const record_model_1 = __importDefault(require("../models/record.model"));
const getRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const records = yield record_model_1.default.find({ userId });
        res.status(200).json({ isError: false, records });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
});
exports.getRecords = getRecords;
function uploadAudioToCloudinary(file) {
    return new Promise((resolve, reject) => {
        cloudinary_1.default.v2.uploader.upload(file.tempFilePath, { resource_type: "auto" }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
}
const addRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { audio } = req.files;
        const { name, transcript } = req.body;
        const audioUploadResult = yield uploadAudioToCloudinary(audio);
        let record = new record_model_1.default({
            name,
            audioUrl: audioUploadResult.url,
            userId,
            transcript,
        });
        yield record.save();
        res.status(200).json({ isError: false, record });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
});
exports.addRecord = addRecord;
const deleteRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const { id } = req.params;
        if (!userId) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const records = yield record_model_1.default.findByIdAndDelete(id);
        res.status(200).json({ isError: false, message: "Recording deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
});
exports.deleteRecord = deleteRecord;
