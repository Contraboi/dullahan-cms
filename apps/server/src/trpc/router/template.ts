import { publicProcedure, router } from "../trpc";
import Template from "../../classes/Template";
import { z } from "zod";
import { TemplateSchema } from "../../interfaces/CMS";

export const templateRouter = router({
  getAll: publicProcedure.query(async () => await Template.getAll()),
  getOne: publicProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .query(async (ctx) => {
      const { handle } = ctx.input;
      return await Template.get(handle);
    }),
  create: publicProcedure.input(TemplateSchema).mutation((ctx) => {
    const { input } = ctx;
    return Template.create(input);
  }),
  edit: publicProcedure
    .input(
      z.object({
        handle: z.string(),
        data: z.any(), // TODO: Fix this
      })
    )
    .mutation(async (ctx) => {
      const { input } = ctx;
      return await Template.update(input.data, input.handle);
    }),
});
