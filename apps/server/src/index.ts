import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import headlessRouter from "./routes";
import { appRouter } from "./trpc/router/_app";
import { createContext } from "./trpc/trpc";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use("/api", headlessRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
