import { router } from "../trpc";
import { collectionRouter } from "./collection";
import { templateRouter } from "./template";
import { componentRouter } from "./component";
import { assetsRouter } from "./assets";

export const appRouter = router({
  collection: collectionRouter,
  template: templateRouter,
  assets: assetsRouter,
  component: componentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
