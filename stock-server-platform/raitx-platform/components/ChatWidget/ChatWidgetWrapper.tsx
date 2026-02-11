"use client";

import { usePathname } from "next/navigation";
import ChatWidget from "./ChatWidget";

/** آدرس تصاویر آواتار ادمین‌ها (مثلاً از پوشهٔ public) */
const DEFAULT_ADMIN_AVATARS: string[] = [
  // مثال: "/images/support/avatar1.jpg", "/images/support/avatar2.jpg"
];

interface ChatWidgetWrapperProps {
  /** چند آواتار برای نمایش در هدر چت پشتیبانی */
  adminAvatars?: string[];
}

/** ویجت چت فقط در صفحات غیر ادمین نمایش داده می‌شود */
export default function ChatWidgetWrapper({ adminAvatars = DEFAULT_ADMIN_AVATARS }: ChatWidgetWrapperProps = {}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <ChatWidget adminAvatars={adminAvatars.length > 0 ? adminAvatars : undefined} />;
}
