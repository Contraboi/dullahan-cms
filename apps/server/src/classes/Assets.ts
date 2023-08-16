import { filePaths } from "../interfaces/Types";
import { AssetType } from "../interfaces/CMS";
import JsonHandler from "./JsonHandler";

export default class Assets {
  private static filePath: string = filePaths.ASSETS + "/";

  constructor() {}

  static async getAll() {
    return await JsonHandler.getAllFromDir<AssetType>(this.filePath);
  }

  static async get(handle: string) {
    return await JsonHandler.getOneFromDir<AssetType>(this.filePath, handle);
  }

  static async upload(data: AssetType) {
    return JsonHandler.createJson(this.filePath, data.file.name, data, "file");
  }

  static async update(assetName: string, data: Partial<AssetType>) {
    return JsonHandler.updateJson<AssetType>(this.filePath, assetName, data);
  }
}
