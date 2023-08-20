"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function createDirectory(path) {
    if ((0, fs_1.existsSync)(path)) {
        return;
    }
    (0, fs_1.mkdirSync)(path);
}
exports.default = createDirectory;
