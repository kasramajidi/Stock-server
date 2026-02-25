import { z } from "zod";

export const addressCreateSchema = z.object({
  title: z.string().min(1, "عنوان آدرس الزامی است.").max(100, "عنوان نباید بیش از ۱۰۰ کاراکتر باشد."),
  addressText: z.string().min(1, "متن آدرس الزامی است.").max(2000, "متن آدرس نباید بیش از ۲۰۰۰ کاراکتر باشد."),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

export const addressUpdateSchema = addressCreateSchema.partial();

export type AddressCreateInput = z.infer<typeof addressCreateSchema>;
export type AddressUpdateInput = z.infer<typeof addressUpdateSchema>;
