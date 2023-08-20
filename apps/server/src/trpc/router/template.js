"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateRouter = void 0;
const trpc_1 = require("../trpc");
const Template_1 = __importDefault(require("../../classes/Template"));
const zod_1 = require("zod");
const CMS_1 = require("../../interfaces/CMS");
exports.templateRouter = (0, trpc_1.router)({
    getAll: trpc_1.publicProcedure.query(async () => await Template_1.default.getAll()),
    getOne: trpc_1.publicProcedure
        .input(zod_1.z.object({
        handle: zod_1.z.string(),
    }))
        .query(async (ctx) => {
        const { handle } = ctx.input;
        return await Template_1.default.get(handle);
    }),
    create: trpc_1.publicProcedure.input(CMS_1.TemplateSchema).mutation((ctx) => {
        const { input } = ctx;
        return Template_1.default.create(input);
    }),
    edit: trpc_1.publicProcedure
        .input(zod_1.z.object({
        handle: zod_1.z.string(),
        data: zod_1.z.any(), // TODO: Fix this
    }))
        .mutation(async (ctx) => {
        const { input } = ctx;
        return await Template_1.default.update(input.data, input.handle);
    }),
});
