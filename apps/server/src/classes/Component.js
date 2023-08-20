"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../interfaces/Types");
const JsonHandler_1 = __importDefault(require("./JsonHandler"));
class Component {
    static filePath = Types_1.filePaths.COMPONENTS + "/";
    constructor() { }
    static async getAll() {
        return await JsonHandler_1.default.getAllFromDir(this.filePath);
    }
    static async get(handle) {
        return await JsonHandler_1.default.getOneFromDir(this.filePath, handle);
    }
    static async create(data) {
        return JsonHandler_1.default.createJson(this.filePath, data.title, data, "handle");
    }
    static getEntryByKey(collectionHandle, key) {
        return JsonHandler_1.default.getFromDirByKey(this.filePath, collectionHandle, {
            key: "handle",
            value: key,
        });
    }
    static async update(data, componentHandle) {
        return await JsonHandler_1.default.updateJson(this.filePath, data.title ? componentHandle + "/" + data.title : componentHandle, data);
    }
}
exports.default = Component;
