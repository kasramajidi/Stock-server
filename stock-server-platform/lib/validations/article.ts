import { z } from "zod";

// آدرس تصویر: اختیاری؛ می‌تواند URL کامل، مسیر نسبی، یا خالی/null باشد
const optionalImage = z
  .union([z.string().max(2000), z.null(), z.undefined()])
  .optional()
  .transform((s) => (typeof s === "string" && s.trim() !== "" ? s.trim() : undefined));

export const articleCreateSchema = z.object({
  image: optionalImage,
  title: z
    .string()
    .min(1, "عنوان الزامی است.")
    .max(300)
    .transform((s) => s.trim()),
  publishedAt: z
    .union([z.string(), z.date()])
    .optional()
    .transform((s) => (s ? (typeof s === "string" ? new Date(s) : s) : undefined))
    .refine((d) => d == null || !Number.isNaN(d.getTime()), { message: "فرمت تاریخ معتبر نیست." }),
  tags: z
    .union([z.array(z.string().max(50)).max(20), z.null(), z.undefined()])
    .default([])
    .transform((t) => (Array.isArray(t) ? t : [])),
  category: z
    .string()
    .min(1, "دسته‌بندی الزامی است.")
    .max(100)
    .transform((s) => s.trim()),
  content: z.string().min(1, "محتوا الزامی است.").max(100_000),
  excerpt: z
    .string()
    .min(1, "متن معرفی (excerpt) الزامی است.")
    .max(1000)
    .transform((s) => s.trim()),
});

export type ArticleCreateInput = z.infer<typeof articleCreateSchema>;

export const articleUpdateSchema = articleCreateSchema.partial();

export type ArticleUpdateInput = z.infer<typeof articleUpdateSchema>;
