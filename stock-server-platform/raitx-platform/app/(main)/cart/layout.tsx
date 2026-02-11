import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "سبد خرید | ريتكس",
  description:
    "سبد خرید شما در ريتكس - مشاهده و مدیریت محصولات انتخابی خود",
  keywords: ["سبد خرید", "خرید", "فروشگاه", "ريتكس"],
  openGraph: {
    title: "سبد خرید | ريتكس",
    description: "مشاهده و مدیریت محصولات انتخابی خود در سبد خرید",
    type: "website",
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartLayout() {
  return <CartPageClient />;
}
