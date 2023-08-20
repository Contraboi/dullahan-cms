"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function accessObjectValueAsString(object, accessString) {
    for (const key of accessString.split(".")) {
        if (object[key] === undefined) {
            return undefined;
        }
        object = object[key];
    }
    return object;
}
exports.default = accessObjectValueAsString;
