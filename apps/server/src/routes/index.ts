import express from "express";
import Collection from "../classes/Collection";
import { FilterCondition, filterConditions } from "../classes/Filter";
import ResponseError from "../classes/Errors";

const headlessRouter = express();
headlessRouter.get("/collections/:collectionHandle", async (req, res) => {
  const error = new ResponseError(res);
  const [collectionHandle] = [req.params.collectionHandle];

  const queryKeys = Object.keys(req.query.filter ?? {});

  if (!queryKeys[0]) {
    const collections = await Collection.getAllEntries(collectionHandle);
    if (!collections) return error.notFound();
    return res.send({ collections });
  }

  const [key, condition] = queryKeys[0].split(":") as [string, FilterCondition];
  const queryValues = Object.values(req.query.filter ?? {});

  if (!filterConditions.includes(condition)) return error.invalidCondition();

  if (!collectionHandle) return error.badRequest("No collection handle");

  const collection = await Collection.getEntriesByKey(
    collectionHandle,
    key,
    queryValues[0] as string,
    condition,
  );

  if (!collection) return error.notFound();

  res.send(collection);
});

export default headlessRouter;
