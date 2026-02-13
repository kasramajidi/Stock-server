import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, "نام و نام خانوادگی الزامی است.")
    .min(2, "نام و نام خانوادگی حداقل ۲ کاراکتر باشد.")
    .max(200)
    .transform((s) => s.trim()),
  email: z
    .string()
    .min(1, "ایمیل الزامی است.")
    .email("فرمت ایمیل معتبر نیست.")
    .transform((s) => s.trim().toLowerCase()),
  message: z
    .string()
    .min(1, "متن نظر الزامی است.")
    .min(10, "متن نظر حداقل ۱۰ کاراکتر باشد.")
    .max(5000)
    .transform((s) => s.trim()),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactReviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  adminResponse: z.string().max(2000).optional().nullable(),
});

export type ContactReviewInput = z.infer<typeof contactReviewSchema>;
