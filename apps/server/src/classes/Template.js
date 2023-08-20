"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../interfaces/Types");
const JsonHandler_1 = __importDefault(require("./JsonHandler"));
class Template {
    static filePath = Types_1.filePaths.TEMPLATES;
    constructor() { }
    static async getAll() {
        return await JsonHandler_1.default.getAllFromDir(this.filePath);
    }
    static async get(handle) {
        return await JsonHandler_1.default.getOneFromDir(this.filePath, handle);
    }
    static create(data) {
        return JsonHandler_1.default.createJson(this.filePath, data.handle, {
            ...data,
            templateData: {
                main: {
                    title: {
                        section: "main",
                        display: "Title",
                        handle: "title",
                        required: true,
                        type: "text",
                    },
                },
                sideBar: {
                    slug: {
                        display: "Slug",
                        handle: "slug",
                        required: true,
                        type: "text",
                    },
                },
            },
        }, "title");
    }
    static async update(data, templateHandle) {
        return await JsonHandler_1.default.updateJson(this.filePath, templateHandle, {
            templateData: data,
        });
    }
}
exports.default = Template;
