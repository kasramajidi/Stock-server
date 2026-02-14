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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50/40">
      <div
        id="contact-us"
        className="mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-auto xl:max-w-5xl mt-6 sm:mt-8 mb-12 md:mb-16 space-y-8 sm:space-y-10"
      >
        <ContactIntro />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm p-4 sm:p-5">
            <ContactMap />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-5 lg:p-6 overflow-hidden">
            <ContactDetails />
          </div>
        </section>

        <ContactFormSection />
      </div>
    </main>
  );
}
