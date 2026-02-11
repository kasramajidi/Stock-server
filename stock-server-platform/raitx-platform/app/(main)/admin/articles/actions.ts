"use server";

import { revalidatePath } from "next/cache";

/**
 * بعد از افزودن/ویرایش/حذف مقاله در ادمین صدا زده شود تا صفحه اخبار سایت به‌روز شود.
 * @param slug در صورت ویرایش/حذف، اسلاگ همان مقاله را بفرست تا صفحه مقاله هم revalidate شود.
 */
export async function revalidateNews(slug?: string): Promise<void> {
  revalidatePath("/news");
  if (slug?.trim()) {
    try {
      revalidatePath(`/news/${encodeURIComponent(slug.trim())}`);
    } catch {
      // نادیده بگیر
    }
  }
}
