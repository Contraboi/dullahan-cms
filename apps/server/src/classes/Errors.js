"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Filter_1 = require("./Filter");
class ResponseError {
    res;
    constructor(res) {
        this.res = res;
    }
    notFound() {
        this.res.status(404).send("Not found");
    }
    badRequest(text) {
        this.res.status(400).send("Bad request - " + text);
    }
    invalidCondition() {
        this.res
            .status(400)
            .send("Invalid condition! conditions are: " + Filter_1.filterConditions.join(", "));
    }
    invalidQuery() {
        this.res.status(400).send("Invalid query");
    }
}
exports.default = ResponseError;
