import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import headlessRouter from "./routes";
import { appRouter } from "./trpc/router/_app";
import { createContext } from "./trpc/trpc";

const app = express();
const port = 4000;

export const serverUrl = (process.env.NODE_MODE = "prod"
  ? "https://dullahan-cms-production.up.railway.app/"
  : "http://localhost:4000/");

console.log(serverUrl, "serverUrl");

app.use(cors());

app.use("/api", headlessRouter);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
