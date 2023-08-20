"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonHandler_1 = __importDefault(require("./JsonHandler"));
class ResourceHandler {
    filePath;
    constructor(filePath) {
        this.filePath = filePath;
    }
    async getAll() {
        return await JsonHandler_1.default.getAllFromDir(this.filePath);
    }
    async get(handle) {
        return await JsonHandler_1.default.getOneFromDir(this.filePath, handle);
    }
}
exports.default = ResourceHandler;
