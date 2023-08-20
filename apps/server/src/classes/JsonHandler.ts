import { DataResponse } from "../interfaces/Types";
import { existsSync, promises, readFileSync, writeFileSync } from "fs";
import { FilterCondition, switchFilterCondition } from "./Filter";
import * as path from "path";
import process from "process";

export default class JsonHandler {
  constructor() {}

  static createJson<T, K extends keyof T>(
    filePath: string,
    fileName: string,
    fileData: T,
    keyOfData: K,
  ): DataResponse<null> {
    const path = this.getDirPath() + `${filePath}/${fileName}.json`;
    console.log(path, "path");

    if (existsSync(path)) {
      console.log("File already exists");
      return {
        data: null,
        message: `File ${fileData[keyOfData]} already exists`,
        status: "neutral",
      };
    }

    try {
      writeFileSync(path, JSON.stringify(fileData, null, 2));
      console.log("File Created");
      return {
        data: null,
        message: `File ${fileData[keyOfData]} created`,
        status: "ok",
      };
    } catch (err: any) {
      console.log("Can't create file: " + err);
      return { data: null, message: `Something went wrong!`, status: "error" };
    }
  }

  static async getAllFromDir<T>(
    directoryPath: string,
  ): Promise<Array<T> | undefined> {
    try {
      const path = this.getDirPath() + directoryPath;
      console.log(path);

      const files = await promises.readdir(path);
      const jsonFiles = files.filter((file) => file.endsWith(".json"));
      return jsonFiles.map((file) => {
        const rawData = readFileSync(path + "/" + file);
        return JSON.parse(rawData.toString());
      });
    } catch (e) {
      console.error("Something went wrong with reading:" + path, e);
    }
  }

  static async getOneFromDir<T>(
    filePath: string,
    fileName: string,
  ): Promise<T | undefined> {
    const path = this.getDirPath() + `${filePath}/${fileName}.json`;
    console.log(path, "path");

    if (!existsSync(path)) {
      console.log("File does not exists");
    }

    try {
      const file = await promises.readFile(path);
      return JSON.parse(file.toString());
    } catch (e) {
      console.log(e);
    }
  }

  static async renameJson(
    filePath: string,
    fileName: string,
    newFileName: string,
  ) {
    const path = this.getDirPath() + `${filePath}/${fileName}.json`;
    const newPath = this.getDirPath() + `${filePath}/${newFileName}.json`;

    if (!existsSync(path)) {
      console.log("File does not exist");
      return { data: null, message: "File does not exist", status: "neutral" };
    }

    try {
      await promises.rename(path, newPath);
      return { data: null, message: "File renamed", status: "ok" };
    } catch (e) {
      console.log(e);
    }
  }

  static async updateJson<T>(
    filePath: string,
    fileName: string,
    updatedData: Partial<T>,
  ): Promise<DataResponse<null>> {
    const path = this.getDirPath() + `${filePath}/${fileName}.json`;

    const currentJSON = await this.getOneFromDir(filePath, fileName);
    if (!currentJSON)
      return { data: null, message: "File does not exist", status: "neutral" };

    const updatedJSON = Object.assign(currentJSON, updatedData);
    console.log(updatedJSON, "updatedJSON");
    await promises.writeFile(path, JSON.stringify(updatedJSON, null, 2));
    return { data: null, message: "File updated", status: "ok" };
  }

  // reads one file check if it has a key and returns the file with the key
  static async getFromDirByKey<T>(
    filePath: string,
    fileName: string,
    searchBy: {
      key: string;
      value: string;
    },
    condition: FilterCondition = "is",
  ): Promise<T | Array<T> | undefined | null> {
    const path = this.getDirPath() + `${filePath}/${fileName}`;

    if (!existsSync(path)) {
      console.log("Collection does not exist");
      return null;
    }

    try {
      const allMatchingFiles = [];
      const files = await promises.readdir(path);
      for (const file of files) {
        const data: T = JSON.parse(
          (await promises.readFile(`${path}/${file}`)).toString(),
        );
        const filteredData = switchFilterCondition(condition, searchBy, data);
        if (filteredData) allMatchingFiles.push(data);
      }

      return allMatchingFiles.length === 1
        ? allMatchingFiles[0]
        : allMatchingFiles;
    } catch (e) {
      console.log(e);
    }
  }

  static getDirPath() {
    return process.cwd();
  }
}
