import { Response } from "express";
import { filterConditions } from "./Filter";
import { filePaths } from "../interfaces/Types";

export default class ResponseError {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  notFound() {
    this.res.status(404).send("Not found" + filePaths.COLLECTIONS);
  }

  badRequest(text: string) {
    this.res.status(400).send("Bad request - " + text);
  }

  invalidCondition() {
    this.res
      .status(400)
      .send(
        "Invalid condition!" +
          "Valid conditions are: " +
          filterConditions.join(", ")
      );
  }

  invalidQuery() {
    this.res.status(400).send("Invalid query");
  }
}
