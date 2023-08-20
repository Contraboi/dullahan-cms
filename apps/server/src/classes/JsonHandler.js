"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Filter_1 = require("./Filter");
class JsonHandler {
    constructor() { }
    static createJson(filePath, fileName, fileData, keyOfData) {
        const path = `${filePath}/${fileName}.json`;
        if ((0, fs_1.existsSync)(path)) {
            console.log("File already exists");
            return {
                data: null,
                message: `File ${fileData[keyOfData]} already exists`,
                status: "neutral",
            };
        }
        try {
            (0, fs_1.writeFileSync)(path, JSON.stringify(fileData, null, 2));
            console.log("File Created");
            return {
                data: null,
                message: `File ${fileData[keyOfData]} created`,
                status: "ok",
            };
        }
        catch (err) {
            console.log("Can't create file: " + err);
            return { data: null, message: `Something went wrong!`, status: "error" };
        }
    }
    static async getAllFromDir(directoryPath) {
        try {
            const files = await fs_1.promises.readdir(directoryPath);
            const jsonFiles = files.filter((file) => file.endsWith(".json"));
            return jsonFiles.map((file) => {
                const rawData = (0, fs_1.readFileSync)(directoryPath + "/" + file);
                return JSON.parse(rawData.toString());
            });
        }
        catch (e) {
            console.error("Something went wrong with reading: ", e);
        }
    }
    static async getOneFromDir(filePath, fileName) {
        const path = `${filePath}/${fileName}.json`;
        console.log(path, "path");
        if (!(0, fs_1.existsSync)(path)) {
            console.log("File does not exists");
        }
        try {
            const file = await fs_1.promises.readFile(path);
            return JSON.parse(file.toString());
        }
        catch (e) {
            console.log(e);
        }
    }
    static async renameJson(filePath, fileName, newFileName) {
        const path = `${filePath}/${fileName}.json`;
        const newPath = `${filePath}/${newFileName}.json`;
        if (!(0, fs_1.existsSync)(path)) {
            console.log("File does not exist");
            return { data: null, message: "File does not exist", status: "neutral" };
        }
        try {
            await fs_1.promises.rename(path, newPath);
            return { data: null, message: "File renamed", status: "ok" };
        }
        catch (e) {
            console.log(e);
        }
    }
    static async updateJson(filePath, fileName, updatedData) {
        const path = `${filePath}/${fileName}.json`;
        const currentJSON = await this.getOneFromDir(filePath, fileName);
        if (!currentJSON)
            return { data: null, message: "File does not exist", status: "neutral" };
        const updatedJSON = Object.assign(currentJSON, updatedData);
        console.log(updatedJSON, "updatedJSON");
        await fs_1.promises.writeFile(path, JSON.stringify(updatedJSON, null, 2));
        return { data: null, message: "File updated", status: "ok" };
    }
    // reads one file check if it has a key and returns the file with the key
    static async getFromDirByKey(filePath, fileName, searchBy, condition = "is") {
        const path = `${filePath}/${fileName}`;
        if (!(0, fs_1.existsSync)(path)) {
            console.log("Collection does not exist");
            return null;
        }
        try {
            const allMatchingFiles = [];
            const files = await fs_1.promises.readdir(path);
            for (const file of files) {
                const data = JSON.parse((await fs_1.promises.readFile(`${path}/${file}`)).toString());
                const filteredData = (0, Filter_1.switchFilterCondition)(condition, searchBy, data);
                if (filteredData)
                    allMatchingFiles.push(data);
            }
            return allMatchingFiles.length === 1
                ? allMatchingFiles[0]
                : allMatchingFiles;
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = JsonHandler;
