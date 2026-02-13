import { z } from "zod";

const cartRequestItemSchema = z.object({
  productId: z.string().cuid("شناسه محصول نامعتبر است."),
  quantity: z.number().int().min(1, "تعداد باید حداقل ۱ باشد."),
});

export const cartRequestCreateSchema = z.object({
  items: z
    .array(cartRequestItemSchema)
    .min(1, "حداقل یک آیتم در سبد خرید لازم است."),
  note: z.string().max(2000).optional().nullable(),
});

export type CartRequestCreateInput = z.infer<typeof cartRequestCreateSchema>;

export const cartRequestUpdateSchema = z.object({
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]).optional(),
  adminNote: z.string().max(2000).optional().nullable(),
});

export type CartRequestUpdateInput = z.infer<typeof cartRequestUpdateSchema>;
