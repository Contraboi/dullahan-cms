import { filePaths } from "../interfaces/Types";
import { ComponentType } from "../interfaces/CMS";
import JsonHandler from "./JsonHandler";

export default class Component {
  private static filePath: string = filePaths.COMPONENTS + "/";

  constructor() {}

  static async getAll() {
    return await JsonHandler.getAllFromDir<ComponentType>(this.filePath);
  }

  static async get(handle: string) {
    return await JsonHandler.getOneFromDir<ComponentType>(
      this.filePath,
      handle
    );
  }

  static async create(data: ComponentType) {
    return JsonHandler.createJson<typeof data, "handle">(
      this.filePath,
      data.title,
      data,
      "handle"
    );
  }

  static getEntryByKey(collectionHandle: string, key: string) {
    return JsonHandler.getFromDirByKey<ComponentType>(
      this.filePath,
      collectionHandle,
      {
        key: "handle",
        value: key,
      }
    );
  }

  static async update(data: Partial<ComponentType>, componentHandle: string) {
    return await JsonHandler.updateJson(
      this.filePath,
      data.title ? componentHandle + "/" + data.title : componentHandle,
      data
    );
  }
}
