"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../interfaces/Types");
const JsonHandler_1 = __importDefault(require("./JsonHandler"));
const createDirectory_1 = __importDefault(require("../utils/createDirectory"));
const Template_1 = __importDefault(require("./Template"));
class Collection {
    static filePath = Types_1.filePaths.COLLECTIONS + "/";
    constructor() { }
    static async getAll() {
        return await JsonHandler_1.default.getAllFromDir(this.filePath);
    }
    static async get(handle) {
        return await JsonHandler_1.default.getOneFromDir(this.filePath, handle);
    }
    static create(data, collectionDirectory) {
        if (collectionDirectory) {
            return JsonHandler_1.default.createJson(this.filePath + collectionDirectory, 
            // @ts-ignore  TODO: fix this
            "handle" in data ? data.handle : String(data.content["main"].title), data, "title");
        }
        else {
            if ("handle" in data) {
                (0, createDirectory_1.default)(this.filePath + data.handle);
                Template_1.default.create({
                    handle: data.handle,
                    title: data.title,
                });
            }
            return JsonHandler_1.default.createJson(this.filePath, 
            // @ts-ignore  TODO: fix this
            "handle" in data ? data.handle : String(data.content["main"].title), data, "title");
        }
    }
    static createDirectory(handle) {
        return (0, createDirectory_1.default)(this.filePath + "/" + handle);
    }
    static async getAllEntries(collectionHandle) {
        return await JsonHandler_1.default.getAllFromDir(this.filePath + collectionHandle);
    }
    static createCollection(data) {
        const initialData = {
            ...data,
            templates: [data.handle],
        };
        return this.create(initialData);
    }
    static createEntry(data, collectionDirectory) {
        return this.create(data, collectionDirectory);
    }
    static getEntriesByKey(collectionHandle, key, value, condition = "is") {
        return JsonHandler_1.default.getFromDirByKey(this.filePath, collectionHandle, {
            key,
            value,
        }, condition);
    }
    static async update(data, collectionHandle, id) {
        if (id) {
            const entry = id
                ? await this.getEntriesByKey(collectionHandle, "id", id)
                : null;
            // @ts-ignore TODO: fix this
            const entryTitle = entry ? entry.content["main"].title : null;
            if (entryTitle && entryTitle !== data.title) {
                await JsonHandler_1.default.renameJson(this.filePath + collectionHandle, entryTitle, data.title);
            }
        }
        return await JsonHandler_1.default.updateJson(this.filePath, data.title ? collectionHandle + "/" + data.title : collectionHandle, data);
    }
}
exports.default = Collection;
