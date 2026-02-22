import { z } from "zod";

export const supportStartSchema = z.object({
  firstName: z.string().min(1, "نام الزامی است.").min(2, "نام حداقل ۲ کاراکتر باشد.").max(100).transform((s) => s.trim()),
  lastName: z.string().min(1, "نام خانوادگی الزامی است.").min(2, "نام خانوادگی حداقل ۲ کاراکتر باشد.").max(100).transform((s) => s.trim()),
  phone: z.string().min(1, "شماره تلفن الزامی است.").max(20).transform((s) => s.replace(/\s/g, "").trim()),
});

export const supportMessageSchema = z.object({
  content: z.string().min(1, "متن پیام الزامی است.").max(2000).transform((s) => s.trim()),
});

export type SupportStartInput = z.infer<typeof supportStartSchema>;
export type SupportMessageInput = z.infer<typeof supportMessageSchema>;
