"use client";

import React, { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "support_chat";

type StoredChat = { conversationId: string; clientToken: string };

type Message = {
  id: string;
  senderType: string;
  content: string;
  createdAt: string;
  admin?: { fullName: string; avatarUrl: string | null } | null;
};

type ChatStep = "form" | "chat";

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);

  const [step, setStep] = useState<ChatStep>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [clientToken, setClientToken] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [supportSeenAt, setSupportSeenAt] = useState<string | null>(null);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [input, setInput] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const data = JSON.parse(raw) as StoredChat;
        if (data.conversationId && data.clientToken) {
          setConversationId(data.conversationId);
          setClientToken(data.clientToken);
          setStep("chat");
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchMessages = async (
    overrideId?: string,
    overrideToken?: string,
    silent = false
  ) => {
    const cid = overrideId ?? conversationId;
    const tok = overrideToken ?? clientToken;
    if (!cid || !tok) return;
    if (!silent) setMessagesLoading(true);
    try {
      const res = await fetch(
        `/api/support/conversations/${cid}/messages?token=${encodeURIComponent(tok)}`
      );
      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.messages)) {
        setMessages(json.messages);
        if (json.supportSeenAt !== undefined) setSupportSeenAt(json.supportSeenAt);
      }
    } finally {
      if (!silent) setMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (open && step === "chat" && conversationId && clientToken) {
      fetchMessages();
    }
  }, [open, step, conversationId, clientToken]);

  // بروزرسانی آنلاین: هر ۴ ثانیه پیام‌های جدید (پاسخ پشتیبان) را بی‌صدا بگیر
  useEffect(() => {
    if (!open || step !== "chat" || !conversationId || !clientToken) return;
    const interval = setInterval(() => fetchMessages(undefined, undefined, true), 4000);
    return () => clearInterval(interval);
  }, [open, step, conversationId, clientToken]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      const res = await fetch("/api/support/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.replace(/\s/g, "").trim(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success && json.conversationId && json.clientToken) {
        const cid = json.conversationId as string;
        const tok = json.clientToken as string;
        const data: StoredChat = { conversationId: cid, clientToken: tok };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setConversationId(cid);
        setClientToken(tok);
        setStep("chat");
        setMessages([]);
        // بلافاصله با همان id/token از سرور پیام‌ها را بگیر (چت باز شود)
        await fetchMessages(cid, tok);
      } else {
        setErrors(
          Array.isArray(json.errors) ? json.errors : ["خطا در ثبت اطلاعات."]
        );
      }
    } catch {
      setErrors(["خطا در ارتباط با سرور."]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !conversationId || !clientToken) return;
    setSendLoading(true);
    setInput("");
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/messages?token=${encodeURIComponent(clientToken)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        }
      );
      const json = await res.json().catch(() => ({}));
      if (json.success && json.message) {
        setMessages((prev) => [...prev, json.message]);
      } else {
        setInput(text);
        alert(
          Array.isArray(json.errors) ? json.errors[0] : "خطا در ارسال پیام."
        );
      }
    } catch {
      setInput(text);
      alert("خطا در ارسال پیام.");
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3">
      {/* پنل چت — بالای دکمه */}
      {open && (
        <div
          className="flex h-[420px] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-t-2xl rounded-es-2xl border border-gray-200 bg-white shadow-xl"
        >
          {/* هدر سبز/فیروزه با عنوان و دکمه بستن */}
          <div className="flex items-center justify-between gap-2 bg-cyan-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
              <span className="font-bold">پشتیبانی استوک سرور</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن چت"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition hover:bg-white/20 hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          {/* محتوا: فرم شروع یا چت */}
          <div className="flex flex-1 flex-col overflow-hidden bg-white">
            {step === "form" ? (
              <div className="flex flex-1 flex-col p-4">
                <p className="mb-3 text-slate-700">سلام</p>
                <p className="mb-4 text-slate-600">
                  برای شروع چت، نام، نام خانوادگی و شماره موبایل را وارد کنید.
                </p>
                <form
                  onSubmit={handleSubmitForm}
                  className="flex flex-1 flex-col gap-3"
                >
                  {errors.length > 0 && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-sm text-red-600">
                      {errors.map((err, i) => (
                        <p key={i}>{err}</p>
                      ))}
                    </div>
                  )}
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="نام"
                    required
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="نام خانوادگی"
                    required
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="شماره موبایل (۰۹۱۲۳۴۵۶۷۸۹)"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-auto w-full rounded-lg bg-cyan-600 py-2.5 font-medium text-white transition hover:bg-cyan-700 disabled:opacity-50"
                  >
                    {loading ? "در حال ثبت..." : "شروع چت"}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[180px]">
                  {messagesLoading ? (
                    <div className="flex justify-center py-6 text-slate-500 text-sm">
                      در حال بارگذاری...
                    </div>
                  ) : (
                    <>
                      {messages.length === 0 && (
                        <div className="flex justify-end">
                          <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-cyan-600 px-3 py-2.5 text-white">
                            <p className="text-sm wrap-break-word">
                              سلام، به پشتیبانی استوک سرور خوش اومدید.
                            </p>
                            <p className="text-sm wrap-break-word mt-1">
                              چطور می‌تونم کمکتون کنم؟ سوالات خود درباره سرور، تجهیزات شبکه یا سفارش رو بپرسید.
                            </p>
                            <p className="text-xs text-cyan-100 mt-1">
                              پشتیبانان به زودی پاسخ می‌دن.
                            </p>
                          </div>
                        </div>
                      )}
                      {messages.map((m) => {
                        const isSeen =
                          m.senderType === "user" &&
                          supportSeenAt &&
                          new Date(m.createdAt).getTime() <= new Date(supportSeenAt).getTime();
                        const adminName = m.senderType === "support" && m.admin ? m.admin.fullName : null;
                        const adminAvatar = m.senderType === "support" && m.admin ? m.admin.avatarUrl : null;
                        const initials = adminName
                          ? adminName
                              .trim()
                              .split(/\s+/)
                              .map((w) => w[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()
                          : "پ";
                        return (
                          <div
                            key={m.id}
                            className={`flex flex-col ${m.senderType === "user" ? "items-start" : "items-end"}`}
                          >
                            {m.senderType === "support" && (
                              <div className="mb-1 flex items-center gap-1.5">
                                {adminAvatar ? (
                                  <img
                                    src={adminAvatar}
                                    alt=""
                                    className="h-6 w-6 rounded-full object-cover"
                                  />
                                ) : (
                                  <span
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-medium text-white"
                                    aria-hidden
                                  >
                                    {initials}
                                  </span>
                                )}
                                <span className="text-xs font-medium text-slate-600">
                                  {adminName ?? "پشتیبانی"}
                                </span>
                              </div>
                            )}
                            <div
                              className={`flex ${m.senderType === "user" ? "justify-start" : "justify-end"} w-full max-w-[85%]`}
                            >
                              <div
                                className={`rounded-2xl px-3 py-2 ${
                                  m.senderType === "user"
                                    ? "rounded-tl-none bg-slate-200 text-slate-800"
                                    : "rounded-tr-none bg-cyan-600 text-white"
                                }`}
                              >
                                <p className="whitespace-pre-wrap text-sm wrap-break-word">
                                  {m.content}
                                </p>
                                <p
                                  className={`mt-0.5 flex items-center gap-1 text-xs ${
                                    m.senderType === "user"
                                      ? "text-slate-500"
                                      : "text-cyan-100"
                                  }`}
                                >
                                  <span>
                                    {new Date(m.createdAt).toLocaleTimeString("fa-IR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  {m.senderType === "user" && (
                                    <span
                                      className={isSeen ? "text-blue-500" : "text-slate-400"}
                                      title={isSeen ? "دیده شده" : "ارسال شده"}
                                      aria-hidden
                                    >
                                      {isSeen ? "✓✓" : "✓"}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className="border-t border-gray-200 p-3"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="پیام خود را بنویسید..."
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      maxLength={2000}
                      disabled={sendLoading}
                    />
                    <button
                      type="submit"
                      disabled={sendLoading || !input.trim()}
                      className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white transition hover:bg-cyan-700 disabled:opacity-50"
                    >
                      {sendLoading ? "..." : "ارسال"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* دکمه شناور چت */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "بستن چت پشتیبانی" : "باز کردن چت پشتیبانی"}
        title={open ? "بستن چت" : "چت پشتیبانی"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-cyan-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h2.4l1.6 3.4 1.6-3.4H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H7.6L6 17.4 4.4 14H4V4h16v10z" />
          <circle cx="8.5" cy="9" r="1.15" />
          <circle cx="12" cy="9" r="1.15" />
          <circle cx="15.5" cy="9" r="1.15" />
        </svg>
      </button>
    </div>
  );
}
