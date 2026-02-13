import { z } from "zod";

const optionalImage = z
  .union([z.string().max(2000), z.literal(""), z.null(), z.undefined()])
  .optional()
  .transform((s) => (typeof s === "string" && s.trim() !== "" ? s.trim() : undefined));

const specsSchema = z
  .union([
    z.record(z.string(), z.union([z.string(), z.number(), z.null()])),
    z.array(z.object({ key: z.string(), value: z.union([z.string(), z.number()]) })),
    z.null(),
    z.undefined(),
  ])
  .optional()
  .nullable();

export const productCreateSchema = z.object({
  slug: z
    .string()
    .min(1, "slug الزامی است (می‌تواند همان عنوان محصول باشد).")
    .max(400)
    .transform((s) => s.trim()),
  title: z.string().min(1, "عنوان الزامی است.").max(300).transform((s) => s.trim()),
  shortDescription: z.string().min(1, "معرفی کوتاه الزامی است.").max(2000).transform((s) => s.trim()),
  content: z.string().min(1, "محتوا الزامی است.").max(100_000),
  category: z.string().min(1, "دسته‌بندی الزامی است.").max(100).transform((s) => s.trim()),
  brand: z.string().min(1, "برند الزامی است.").max(100).transform((s) => s.trim()),
  partNumbers: z
    .union([z.array(z.string().max(50)).max(20), z.null(), z.undefined()])
    .default([])
    .transform((t) => (Array.isArray(t) ? t : [])),
  priceLabel: z.string().min(1, "متن قیمت الزامی است.").max(200).transform((s) => s.trim()),
  inStock: z.boolean().default(true),
  statusLabel: z.string().min(1, "وضعیت ارسال الزامی است.").max(100).transform((s) => s.trim()),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  image: optionalImage,
  specs: specsSchema,
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = productCreateSchema.partial();

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
