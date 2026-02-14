import ContactForm from "../ContactForm/ContactForm";
import ContactSocial from "../ContactSocial/ContactSocial";

export default function ContactFormSection() {
  return (
    <section className="space-y-8 sm:space-y-10">
      <div className="text-center sm:text-right">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          پرسشی دارید؟ پاسختان را خواهیم داد.
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
          سوال خود را از طریق فرم زیر با ما در میان بگذارید. کارشناسان استوک سرور در اسرع وقت از طریق ایمیل با شما در ارتباط خواهند بود.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
        <ContactForm />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 sm:p-8">
        <ContactSocial />
      </div>
    </section>
  );
}
