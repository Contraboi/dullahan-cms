"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentRouter = void 0;
const Component_1 = __importDefault(require("../../classes/Component"));
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const CMS_1 = require("../../interfaces/CMS");
exports.componentRouter = (0, trpc_1.router)({
    getAll: trpc_1.publicProcedure.query(async () => await Component_1.default.getAll()),
    getOne: trpc_1.publicProcedure
        .input(zod_1.z.object({
        handle: zod_1.z.string(),
    }))
        .query(async (ctx) => {
        const { handle } = ctx.input;
        return await Component_1.default.get(handle);
    }),
    create: trpc_1.publicProcedure.input(CMS_1.ComponentSchema).mutation((ctx) => {
        const { input } = ctx;
        return Component_1.default.create(input);
    }),
    update: trpc_1.publicProcedure
        .input(zod_1.z.object({
        handle: zod_1.z.string(),
        templateData: zod_1.z.any(),
    }))
        .mutation(({ input }) => {
        const { templateData, handle } = input;
        const newComponentData = {
            handle: handle,
            templateData: templateData,
        };
        // @ts-ignore
        return Component_1.default.update(newComponentData, handle);
    }),
});
