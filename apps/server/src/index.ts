import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import headlessRouter from "./routes";
import { appRouter } from "./trpc/router/_app";

const app = express();
const port = 4000;

app.use(cors());

app.use("/api", headlessRouter);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
