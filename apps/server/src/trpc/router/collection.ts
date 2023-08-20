import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import Collection from "../../classes/Collection";
import {
  CollectionEntryContentSchema,
  CollectionEntryType,
} from "../../interfaces/CMS";
import { v4 as uuidv4 } from "uuid";

export const collectionRouter = router({
  getAll: publicProcedure.query(() => {
    return Collection.getAll();
  }),
  getOne: publicProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .query((ctx) => {
      const { handle } = ctx.input;
      return Collection.get(handle);
    }),
  getEntry: publicProcedure
    .input(
      z.object({
        collectionHandle: z.string(),
        entryId: z.string(),
      })
    )
    .query((ctx) => {
      const { collectionHandle, entryId } = ctx.input;
      return Collection.getEntriesByKey(collectionHandle, "id", entryId);
    }),
  getAllEntries: publicProcedure
    .input(
      z.object({
        collectionHandle: z.string(),
      })
    )
    .query((ctx) => {
      const { collectionHandle } = ctx.input;
      return Collection.getAllEntries(collectionHandle);
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        handle: z.string(),
        templates: z.array(z.string()),
      })
    )
    .mutation((ctx) => {
      const { input } = ctx;

      return Collection.createCollection({ ...input, numberOfEntries: 0 });
    }),
  createEntry: publicProcedure
    .input(
      z.object({
        collectionHandle: z.string(),
        content: CollectionEntryContentSchema,
      })
    )
    .mutation((ctx) => {
      const { input } = ctx;

      if (!input.content) return null;
      if (typeof input.content === "object" && "main" in input.content) {
        // @ts-ignore  TODO: fix this
        console.log(input.content["main"].Title);
      }

      const newInput: CollectionEntryType = {
        id: uuidv4(),
        // @ts-ignore  TODO: fix this
        title: input.content["main"].Title,
        apiUrl: "",
        content: input.content,
        template: input.collectionHandle,
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
        updatedBy: "admin",
      };
      return Collection.createEntry(newInput, input.collectionHandle);
    }),
  updateEntry: publicProcedure
    .input(
      z.object({
        collectionHandle: z.string(),
        entryId: z.string(),
        content: CollectionEntryContentSchema,
      })
    )
    .mutation(async (ctx) => {
      const { input } = ctx;
      if (!input.content) return null;
      const updatedEntry: Omit<
        CollectionEntryType,
        "createdAt" | "template" | "apiUrl"
      > = {
        id: input.entryId,
        // @ts-ignore  TODO: fix this
        title: input.content["main"].title,
        content: input.content,
        updatedAt: new Date(),
        published: false,
        updatedBy: "admin",
      };
      return await Collection.update(
        updatedEntry,
        input.collectionHandle,
        input.entryId
      );
    }),
});
