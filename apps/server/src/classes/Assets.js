"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../interfaces/Types");
const JsonHandler_1 = __importDefault(require("./JsonHandler"));
class Assets {
    static filePath = Types_1.filePaths.ASSETS + "/";
    constructor() { }
    static async getAll() {
        return await JsonHandler_1.default.getAllFromDir(this.filePath);
    }
    static async get(handle) {
        return await JsonHandler_1.default.getOneFromDir(this.filePath, handle);
    }
    static async upload(data) {
        return JsonHandler_1.default.createJson(this.filePath, data.file.name, data, "file");
    }
    static async update(assetName, data) {
        return JsonHandler_1.default.updateJson(this.filePath, assetName, data);
    }
}
exports.default = Assets;
