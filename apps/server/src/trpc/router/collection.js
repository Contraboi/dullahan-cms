"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const Collection_1 = __importDefault(require("../../classes/Collection"));
const CMS_1 = require("../../interfaces/CMS");
const uuid_1 = require("uuid");
exports.collectionRouter = (0, trpc_1.router)({
    getAll: trpc_1.publicProcedure.query(() => {
        return Collection_1.default.getAll();
    }),
    getOne: trpc_1.publicProcedure
        .input(zod_1.z.object({
        handle: zod_1.z.string(),
    }))
        .query((ctx) => {
        const { handle } = ctx.input;
        return Collection_1.default.get(handle);
    }),
    getEntry: trpc_1.publicProcedure
        .input(zod_1.z.object({
        collectionHandle: zod_1.z.string(),
        entryId: zod_1.z.string(),
    }))
        .query((ctx) => {
        const { collectionHandle, entryId } = ctx.input;
        return Collection_1.default.getEntriesByKey(collectionHandle, "id", entryId);
    }),
    getAllEntries: trpc_1.publicProcedure
        .input(zod_1.z.object({
        collectionHandle: zod_1.z.string(),
    }))
        .query((ctx) => {
        const { collectionHandle } = ctx.input;
        return Collection_1.default.getAllEntries(collectionHandle);
    }),
    create: trpc_1.publicProcedure
        .input(zod_1.z.object({
        title: zod_1.z.string(),
        handle: zod_1.z.string(),
        templates: zod_1.z.array(zod_1.z.string()),
    }))
        .mutation((ctx) => {
        const { input } = ctx;
        return Collection_1.default.createCollection({ ...input, numberOfEntries: 0 });
    }),
    createEntry: trpc_1.publicProcedure
        .input(zod_1.z.object({
        collectionHandle: zod_1.z.string(),
        content: CMS_1.CollectionEntryContentSchema,
    }))
        .mutation((ctx) => {
        const { input } = ctx;
        if (!input.content)
            return null;
        if (typeof input.content === "object" && "main" in input.content) {
            // @ts-ignore  TODO: fix this
            console.log(input.content["main"].Title);
        }
        const newInput = {
            id: (0, uuid_1.v4)(),
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
        return Collection_1.default.createEntry(newInput, input.collectionHandle);
    }),
    updateEntry: trpc_1.publicProcedure
        .input(zod_1.z.object({
        collectionHandle: zod_1.z.string(),
        entryId: zod_1.z.string(),
        content: CMS_1.CollectionEntryContentSchema,
    }))
        .mutation(async (ctx) => {
        const { input } = ctx;
        if (!input.content)
            return null;
        const updatedEntry = {
            id: input.entryId,
            // @ts-ignore  TODO: fix this
            title: input.content["main"].title,
            content: input.content,
            updatedAt: new Date(),
            published: false,
            updatedBy: "admin",
        };
        return await Collection_1.default.update(updatedEntry, input.collectionHandle, input.entryId);
    }),
});
