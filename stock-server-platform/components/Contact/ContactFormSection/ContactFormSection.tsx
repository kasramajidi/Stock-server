import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import ContactForm from "../ContactForm/ContactForm";
import ContactMap from "../ContactMap/ContactMap";
import ContactSocial from "../ContactSocial/ContactSocial";

export default function ContactFormSection() {
  return (
    <section className="space-y-6 sm:space-y-8 md:space-y-10">
      <SectionHeader title="سوالی دارید؟ بپرسید" subtitle="فرم تماس و شبکه‌های اجتماعی" />
      <ContactMap />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        <ContactForm />
        <ContactSocial />
      </div>
    </section>
  );
}
