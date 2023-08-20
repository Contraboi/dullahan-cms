import { filePaths } from "../interfaces/Types";
import { CollectionEntryType, CollectionType } from "../interfaces/CMS";
import JsonHandler from "./JsonHandler";
import createDirectory from "../utils/createDirectory";
import Template from "./Template";
import { FilterCondition } from "./Filter";

export default class Collection {
  private static filePath: string = filePaths.COLLECTIONS + "/";

  constructor() {}

  static async getAll() {
    return await JsonHandler.getAllFromDir<CollectionType>(this.filePath);
  }

  static async get(handle: string) {
    return await JsonHandler.getOneFromDir<CollectionType>(
      this.filePath,
      handle
    );
  }

  private static create(
    data: CollectionType | CollectionEntryType,
    collectionDirectory?: string
  ) {
    if (collectionDirectory) {
      return JsonHandler.createJson<typeof data, "title">(
        this.filePath + collectionDirectory,
        // @ts-ignore  TODO: fix this
        "handle" in data ? data.handle : String(data.content["main"].title),
        data,
        "title"
      );
    } else {
      if ("handle" in data) {
        createDirectory(this.filePath + data.handle);
        Template.create({
          handle: data.handle,
          title: data.title,
        });
      }

      return JsonHandler.createJson<typeof data, "title">(
        this.filePath,
        // @ts-ignore  TODO: fix this
        "handle" in data ? data.handle : String(data.content["main"].title),
        data,
        "title"
      );
    }
  }

  static createDirectory(handle: string) {
    return createDirectory(this.filePath + "/" + handle);
  }

  static async getAllEntries(collectionHandle: string) {
    return await JsonHandler.getAllFromDir<CollectionEntryType>(
      this.filePath + collectionHandle
    );
  }

  static createCollection(data: CollectionType) {
    const initialData = {
      ...data,
      templates: [data.handle],
    };
    return this.create(initialData);
  }

  static createEntry(data: CollectionEntryType, collectionDirectory: string) {
    return this.create(data, collectionDirectory);
  }

  static getEntriesByKey(
    collectionHandle: string,
    key: string,
    value: string,
    condition: FilterCondition = "is"
  ) {
    return JsonHandler.getFromDirByKey<CollectionEntryType>(
      this.filePath,
      collectionHandle,
      {
        key,
        value,
      },
      condition
    );
  }

  static async update(
    data: Partial<CollectionType>,
    collectionHandle: string,
    id?: string
  ) {
    if (id) {
      const entry = id
        ? await this.getEntriesByKey(collectionHandle, "id", id)
        : null;
      // @ts-ignore TODO: fix this
      const entryTitle = entry ? entry.content["main"].title : null;

      if (entryTitle && entryTitle !== data.title) {
        await JsonHandler.renameJson(
          this.filePath + collectionHandle,
          entryTitle,
          data.title!!
        );
      }
    }

    return await JsonHandler.updateJson(
      this.filePath,
      data.title!! ? collectionHandle + "/" + data.title!! : collectionHandle,
      data
    );
  }
}
