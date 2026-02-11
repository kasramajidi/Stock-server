import { redirect } from "next/navigation";

/** صفحه فروشگاه حذف شده؛ هدایت به صفحه اصلی */
export default function ShopPage() {
  redirect("/");
}
