import type { Metadata } from "next";
import { fetchShopProducts } from "@/lib/shop-api";
import ShopPageClient from "@/components/Shop/ShopPageClient";

export const metadata: Metadata = {
  title: "فروشگاه",
  description:
    "خرید سرور استوک HP و HPE، رم سرور، هارد، CPU، پاور و تجهیزات شبکه با بهترین قیمت و گارانتی. استوک سرور.",
  openGraph: {
    title: "فروشگاه | استوک سرور - سرور و تجهیزات شبکه",
    description: "خرید سرور و تجهیزات شبکه با بهترین قیمت",
    url: "/shop",
  },
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  let initialProducts: Awaited<ReturnType<typeof fetchShopProducts>> = [];
  try {
    initialProducts = await fetchShopProducts();
  } catch {
    // استفاده از آرایه خالی در صورت خطا
  }

  return <ShopPageClient initialProducts={initialProducts} />;
}
