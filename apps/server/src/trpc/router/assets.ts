import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import Assets from "../../classes/Assets";
import { AssetSchema } from "../../interfaces/CMS";

export const assetsRouter = router({
  getAll: publicProcedure.query(() => {
    return Assets.getAll();
  }),
  getOne: publicProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .query((ctx) => {
      const { handle } = ctx.input;
      return Assets.get(handle);
    }),
  upload: publicProcedure
    .input(
      z.object({
        file: AssetSchema,
      })
    )
    .mutation((ctx) => {
      const { file } = ctx.input;
      return Assets.upload(file);
    }),
  update: publicProcedure
    .input(
      z.object({
        assetName: z.string(),
        asset: AssetSchema,
      })
    )
    .mutation((ctx) => {
      const { assetName, asset } = ctx.input;
      return Assets.update(assetName, asset);
    }),
});
