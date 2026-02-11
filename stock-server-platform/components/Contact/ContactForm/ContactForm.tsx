export default function ContactForm() {
  return (
    <form className="space-y-4 sm:space-y-5 [&_input:focus]:border-[var(--primary-hover)] [&_input:focus]:ring-2 [&_input:focus]:ring-[var(--primary-hover)]/20 [&_textarea:focus]:border-[var(--primary-hover)] [&_textarea:focus]:ring-2 [&_textarea:focus]:ring-[var(--primary-hover)]/20">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
          نام
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="نام شما"
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
          ایمیل
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="example@email.com"
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            موضوع
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="موضوع پیام"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            شماره تماس
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
          پیام
        </label>
        <textarea
          id="contact-message"
          placeholder="متن پیام شما..."
          required
          rows={5}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl border-2 border-[var(--primary-hover)] bg-[var(--primary-hover)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-dark)] hover:border-[var(--primary-dark)]"
      >
        ارسال پیام
      </button>
    </form>
  );
}
