import { filePaths } from "../interfaces/Types";
import { TemplateType } from "../interfaces/CMS";
import JsonHandler from "./JsonHandler";

export default class Template {
  private static filePath = filePaths.TEMPLATES;

  constructor() {}

  static async getAll() {
    return await JsonHandler.getAllFromDir<TemplateType>(this.filePath);
  }

  static async get(handle: string) {
    return await JsonHandler.getOneFromDir<TemplateType>(this.filePath, handle);
  }

  static create(data: TemplateType) {
    return JsonHandler.createJson<TemplateType, "title">(
      this.filePath,
      data.handle,
      {
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
      },
      "title"
    );
  }

  static async update(data: Partial<TemplateType>, templateHandle: string) {
    return await JsonHandler.updateJson(this.filePath, templateHandle, {
      templateData: data,
    });
  }
}
