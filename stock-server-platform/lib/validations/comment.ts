import { z } from "zod";

export const commentCreateSchema = z.object({
  content: z
    .string()
    .min(1, "متن کامنت الزامی است.")
    .max(2000)
    .transform((s) => s.trim()),
  parentId: z.string().cuid().optional().nullable(), // ایدی کامنتی که داریم بهش پاسخ می‌دیم (برای پاسخ تو در تو)
});

export type CommentCreateInput = z.infer<typeof commentCreateSchema>;

export const commentUpdateSchema = z.object({
  content: z
    .string()
    .min(1, "متن کامنت الزامی است.")
    .max(2000)
    .transform((s) => s.trim()),
});

export type CommentUpdateInput = z.infer<typeof commentUpdateSchema>;

export const commentReviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  adminReply: z.string().max(2000).optional().nullable(),
});

export type CommentReviewInput = z.infer<typeof commentReviewSchema>;
