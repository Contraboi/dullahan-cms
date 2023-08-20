"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterConditions = exports.switchFilterCondition = void 0;
const accessObjectValueAsString_1 = __importDefault(require("../utils/accessObjectValueAsString"));
const switchFilterCondition = (condition, searchBy, data) => {
    const objectValueAsString = (0, accessObjectValueAsString_1.default)(data, searchBy.key);
    const searchByValue = searchBy.value.toLowerCase();
    if (!objectValueAsString)
        return;
    switch (condition) {
        case "is":
            if (objectValueAsString === searchByValue) {
                return data;
            }
            break;
        case "not":
            if (objectValueAsString !== searchByValue) {
                return data;
            }
            break;
        case "contains":
            if (searchByValue.includes(objectValueAsString) ||
                objectValueAsString.includes(searchByValue)) {
                return data;
            }
            break;
        case "starts_with":
            if (objectValueAsString.startsWith(searchByValue)) {
                return data;
            }
            break;
        case "doesnt_start_with":
            if (!objectValueAsString.startsWith(searchByValue)) {
                return data;
            }
            break;
        case "ends_with":
            if (objectValueAsString.endsWith(searchByValue)) {
                return data;
            }
            break;
        case "doesnt_end_with":
            if (!objectValueAsString.endsWith(searchByValue)) {
                return data;
            }
            break;
        case "lt":
            if (Number(objectValueAsString) < Number(searchByValue)) {
                return data;
            }
            break;
        case "gt":
            if (Number(objectValueAsString) > Number(searchByValue)) {
                return data;
            }
            break;
        case "lte":
            if (Number(objectValueAsString) <= Number(searchByValue)) {
                return data;
            }
            break;
        case "gte":
            if (Number(objectValueAsString) >= Number(searchByValue)) {
                return data;
            }
            break;
        case "matches":
            if (objectValueAsString.match(searchByValue)) {
                return data;
            }
            break;
        case "doesnt_match":
            if (!objectValueAsString.match(searchByValue)) {
                return data;
            }
            break;
    }
};
exports.switchFilterCondition = switchFilterCondition;
exports.filterConditions = [
    "is",
    "not",
    "contains",
    "starts_with",
    "ends_with",
    "doesnt_start_with",
    "doesnt_end_with",
    "lt",
    "gt",
    "lte",
    "gte",
    "matches",
    "doesnt_match", //  Include if field value does not match the provided regular expression.
];
