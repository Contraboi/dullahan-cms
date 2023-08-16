import { existsSync, mkdirSync } from "fs";

export default function createDirectory(path: string) {
  if (existsSync(path)) {
    return;
  }
  mkdirSync(path);
}
