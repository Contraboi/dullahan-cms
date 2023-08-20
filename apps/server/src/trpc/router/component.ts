import Component from "../../classes/Component";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { ComponentSchema, ComponentType } from "../../interfaces/CMS";

export const componentRouter = router({
  getAll: publicProcedure.query(async () => await Component.getAll()),
  getOne: publicProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .query(async (ctx) => {
      const { handle } = ctx.input;
      return await Component.get(handle);
    }),
  create: publicProcedure.input(ComponentSchema).mutation((ctx) => {
    const { input } = ctx;
    return Component.create(input);
  }),
  update: publicProcedure
    .input(
      z.object({
        handle: z.string(),
        templateData: z.any(),
      })
    )
    .mutation(({ input }) => {
      const { templateData, handle } = input;
      const newComponentData: Partial<ComponentType> = {
        handle: handle,
        templateData: templateData,
      };
      // @ts-ignore
      return Component.update(newComponentData, handle);
    }),
});
