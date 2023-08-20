"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetsRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const Assets_1 = __importDefault(require("../../classes/Assets"));
const CMS_1 = require("../../interfaces/CMS");
exports.assetsRouter = (0, trpc_1.router)({
    getAll: trpc_1.publicProcedure.query(() => {
        return Assets_1.default.getAll();
    }),
    getOne: trpc_1.publicProcedure
        .input(zod_1.z.object({
        handle: zod_1.z.string(),
    }))
        .query((ctx) => {
        const { handle } = ctx.input;
        return Assets_1.default.get(handle);
    }),
    upload: trpc_1.publicProcedure
        .input(zod_1.z.object({
        file: CMS_1.AssetSchema,
    }))
        .mutation((ctx) => {
        const { file } = ctx.input;
        return Assets_1.default.upload(file);
    }),
    update: trpc_1.publicProcedure
        .input(zod_1.z.object({
        assetName: zod_1.z.string(),
        asset: CMS_1.AssetSchema,
    }))
        .mutation((ctx) => {
        const { assetName, asset } = ctx.input;
        return Assets_1.default.update(assetName, asset);
    }),
});
