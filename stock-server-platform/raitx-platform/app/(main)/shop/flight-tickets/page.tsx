import { redirect } from "next/navigation";

export const metadata = {
  title: "خرید بلیط پرواز خارجی | فروشگاه ريتكس",
  description:
    "رزرو و خرید بلیط هواپیما خارجی از وبسایت‌های معتبر؛ لیست سایت‌ها، نحوه خرید آنلاین و ریفاند. ريتكس.",
  alternates: { canonical: "/shop/flight-tickets" },
};

export default function FlightTicketsPage() {
  redirect("/shop/product/11");
}
