import { z } from "zod";

const mobileRegex = /^09[0-9]{9}$/;

function normalizeMobile(value: string) {
  return value.replace(/\s/g, "").replace(/^\+98/, "0");
}

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "نام و نام خانوادگی الزامی است.")
      .min(2, "نام و نام خانوادگی حداقل ۲ کاراکتر باشد.")
      .transform((s) => s.trim()),
    mobile: z
      .string()
      .min(1, "شماره موبایل الزامی است.")
      .transform((s) => normalizeMobile(s.trim()))
      .refine((s) => mobileRegex.test(s), "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)."),
    email: z
      .string()
      .min(1, "ایمیل الزامی است.")
      .email("فرمت ایمیل معتبر نیست.")
      .transform((s) => s.trim().toLowerCase()),
    password: z
      .string()
      .min(1, "رمز عبور الزامی است.")
      .min(8, "رمز عبور حداقل ۸ کاراکتر باشد."),
    acceptTerms: z.literal(true, {
      message: "پذیرش قوانین و مقررات الزامی است.",
    }),
  })
  .strict();

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z
  .object({
    mobile: z
      .string()
      .min(1, "شماره موبایل الزامی است.")
      .transform((s) => normalizeMobile(s.trim()))
      .refine((s) => mobileRegex.test(s), "شماره موبایل معتبر نیست."),
    password: z.string().min(1, "رمز عبور الزامی است."),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;
