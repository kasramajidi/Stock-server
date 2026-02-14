import type { Metadata } from "next";
import ContactIntro from "@/components/Contact/ContactIntro/ContactIntro";
import ContactFormSection from "@/components/Contact/ContactFormSection/ContactFormSection";
import ContactMap from "@/components/Contact/ContactMap/ContactMap";
import ContactDetails from "@/components/Contact/ContactDetails/ContactDetails";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "تماس با استوک سرور — فروش سرور و تجهیزات شبکه. شماره تماس، ایمیل، آدرس و فرم تماس.",
  openGraph: { title: "تماس با ما | استوک سرور", url: "/contact" },
  alternates: { canonical: "/contact" },
};

const sectionClass = "mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px]";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50/40">
      <div
        id="contact-us"
        className={`${sectionClass} mt-4 sm:mt-6 mb-12 md:mb-16 space-y-8 sm:space-y-10`}
      >
        <ContactIntro />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-5 lg:p-6 overflow-hidden order-2 lg:order-1">
            <ContactDetails />
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm p-4 sm:p-5 order-1 lg:order-2">
            <ContactMap />
          </div>
        </section>

        <ContactFormSection />
      </div>
    </main>
  );
}
