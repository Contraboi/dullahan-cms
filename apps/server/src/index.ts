import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import headlessRouter from "./routes";
import { appRouter } from "./trpc/router/_app";
import { createContext } from "./trpc/trpc";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use("/api", headlessRouter);

app.get("*", (req, res) => {
  const __dirname = path.resolve();
  const pathToIndex = path.join(
    __dirname,
    "..",
    "client",
    "dist",
    "index.html",
  );
  const raw = fs.readFileSync(pathToIndex, { encoding: "utf8", flag: "r" });

  res.send(raw);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
