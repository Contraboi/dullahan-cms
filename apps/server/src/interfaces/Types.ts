export type DataResponse<T> = {
  message?: string;
  status: "ok" | "neutral" | "error";
  data: T | null;
};

export enum filePaths {
  COLLECTIONS = "/dist/content/collections",
  TEMPLATES = "/dist/resources/templates",
  ASSETS = "/dist/resources/assets",
  COMPONENTS = "/dist/resources/components",
}
