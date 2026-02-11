import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import ContactForm from "../ContactForm/ContactForm";
import ContactMap from "../ContactMap/ContactMap";
import ContactSocial from "../ContactSocial/ContactSocial";

export default function ContactFormSection() {
  return (
    <section className="space-y-8 sm:space-y-10 md:space-y-12">
      <SectionHeader
        title="سوالی دارید؟ بپرسید"
        subtitle="فرم تماس و شبکه‌های اجتماعی"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <ContactMap />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <ContactForm />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <ContactSocial />
        </div>
      </div>
    </section>
  );
}
