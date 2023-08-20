"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentSchema = exports.TemplateSchema = exports.AssetSchema = exports.FileSchema = exports.CollectionEntrySchema = exports.TemplateDataSchema = exports.CollectionEntryContentSchema = exports.CollectionSchema = exports.DefaultDataSchema = void 0;
const zod_1 = require("zod");
const literalSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]);
exports.DefaultDataSchema = zod_1.z.object({
    title: zod_1.z.string(),
    handle: zod_1.z.string(),
});
exports.CollectionSchema = zod_1.z.object({
    templates: zod_1.z.array(zod_1.z.string()),
    numberOfEntries: zod_1.z.number(),
});
exports.CollectionEntryContentSchema = zod_1.z.lazy(() => zod_1.z.union([
    literalSchema,
    zod_1.z.array(exports.CollectionEntryContentSchema),
    zod_1.z.record(exports.CollectionEntryContentSchema),
]));
exports.TemplateDataSchema = zod_1.z.lazy(() => zod_1.z.union([
    literalSchema,
    zod_1.z.array(exports.TemplateDataSchema),
    zod_1.z.record(exports.TemplateDataSchema),
]));
exports.CollectionEntrySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string(),
    apiUrl: zod_1.z.string().url({ message: "Invalid URL" }),
    content: exports.CollectionEntryContentSchema,
    template: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    published: zod_1.z.boolean(),
    updatedBy: zod_1.z.string(),
});
exports.FileSchema = zod_1.z.object({
    name: zod_1.z.string(),
    size: zod_1.z.number(),
    type: zod_1.z.string(),
    lastModified: zod_1.z.number(),
    lastModifiedDate: zod_1.z.string(),
    alt: zod_1.z.string(),
});
exports.AssetSchema = zod_1.z.object({
    file: exports.FileSchema,
    base64: zod_1.z.string(),
});
exports.TemplateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    handle: zod_1.z.string(),
    templateData: exports.TemplateDataSchema.or(zod_1.z.undefined()),
});
exports.ComponentSchema = zod_1.z.object({
    title: zod_1.z.string(),
    handle: zod_1.z.string(),
    templateData: exports.TemplateDataSchema,
});
