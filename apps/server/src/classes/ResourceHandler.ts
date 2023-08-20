import JsonHandler from "./JsonHandler";

export default class ResourceHandler<T> {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getAll() {
    return await JsonHandler.getAllFromDir<T>(this.filePath);
  }

  async get(handle: string) {
    return await JsonHandler.getOneFromDir<T>(this.filePath, handle);
  }
}
