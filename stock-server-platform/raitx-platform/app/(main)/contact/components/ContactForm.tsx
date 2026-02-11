"use client";

import { useState } from "react";

const API_URL = "/api/auth-proxy?action=ExamRegister";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.subject.trim() || "تماس از صفحه تماس",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          comment: formData.message,
          date: new Date().toISOString(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof data?.error === "string" ? data.error : "خطا در ارسال پیام"
        );
      }
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "خطا در ارسال. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="order-1 lg:order-1 flex flex-col min-h-[350px] sm:min-h-[300px] md:h-[350px]">
      <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-3 sm:mb-4 text-right">
        سوالی دارید؟ بپرسید
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm space-y-2.5 sm:space-y-3 flex-1 flex flex-col [&_input:focus]:border-[#ff5538] [&_textarea:focus]:border-[#ff5538]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <input
              type="text"
              placeholder="نام"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="آدرس ایمیل"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <input
              type="text"
              placeholder="موضوع پیام"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="شماره تماس"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
        </div>
        <div className="flex-1 min-h-[100px] sm:min-h-[120px]">
          <textarea
            placeholder="پیام"
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full h-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent resize-none text-right"
          />
        </div>
        {status === "success" && (
          <p className="text-sm text-green-600 text-right">
            پیام شما با موفقیت ارسال شد.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 text-right">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white text-xs sm:text-sm font-medium py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg transition-opacity hover:opacity-90 mt-2 sm:mt-0 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#ff5538" }}
        >
          {submitting ? "در حال ارسال..." : "ارسال"}
        </button>
      </form>
    </div>
  );
}
