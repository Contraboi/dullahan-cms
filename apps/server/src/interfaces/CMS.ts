import { z } from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
export type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];

export const DefaultDataSchema = z.object({
  title: z.string(),
  handle: z.string(),
});

export const CollectionSchema = z.object({
  templates: z.array(z.string()),
  numberOfEntries: z.number(),
});

export const CollectionEntryContentSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(CollectionEntryContentSchema),
    z.record(CollectionEntryContentSchema),
  ])
);

export const TemplateDataSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(TemplateDataSchema),
    z.record(TemplateDataSchema),
  ])
);

export const CollectionEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  apiUrl: z.string().url({ message: "Invalid URL" }),
  content: CollectionEntryContentSchema,
  template: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean(),
  updatedBy: z.string(),
});

export const FileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number(),
  lastModifiedDate: z.string(),
  alt: z.string(),
});

export const AssetSchema = z.object({
  file: FileSchema,
  base64: z.string(),
});

export const TemplateSchema = z.object({
  title: z.string(),
  handle: z.string(),
  templateData: TemplateDataSchema.or(z.undefined()),
});

export type CollectionEntryContent = z.infer<
  typeof CollectionEntryContentSchema
>;

export const ComponentSchema = z.object({
  title: z.string(),
  handle: z.string(),
  templateData: TemplateDataSchema,
});
export type DefaultDataType = z.infer<typeof DefaultDataSchema>;
export type CollectionEntryType = z.infer<typeof CollectionEntrySchema>;
export type TemplateDataType = z.infer<typeof TemplateDataSchema>;
export type AssetType = z.infer<typeof AssetSchema>;
export type FileWithPathType = z.infer<typeof FileSchema>;
export type TemplateType = z.infer<typeof TemplateSchema> & DefaultDataType;
export type CollectionType = z.infer<typeof CollectionSchema> & DefaultDataType;
export type ComponentType = z.infer<typeof ComponentSchema>;
