"use client";

import React, { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "support_chat";

type StoredChat = { conversationId: string; clientToken: string };

type Message = {
  id: string;
  senderType: string;
  content: string;
  createdAt: string;
};

export default function SupportPage() {
  const [step, setStep] = useState<"form" | "chat">("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [clientToken, setClientToken] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
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

  useEffect(() => {
    if (step === "chat" && conversationId && clientToken) {
      fetchMessages();
    }
  }, [step, conversationId, clientToken]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    if (!conversationId || !clientToken) return;
    setMessagesLoading(true);
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/messages?token=${encodeURIComponent(clientToken)}`
      );
      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.messages)) {
        setMessages(json.messages);
      }
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      const res = await fetch("/api/support/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), phone: phone.replace(/\s/g, "").trim() }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success && json.conversationId && json.clientToken) {
        const data: StoredChat = { conversationId: json.conversationId, clientToken: json.clientToken };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setConversationId(json.conversationId);
        setClientToken(json.clientToken);
        setStep("chat");
        setMessages([]);
        fetchMessages();
      } else {
        setErrors(Array.isArray(json.errors) ? json.errors : ["خطا در ثبت اطلاعات."]);
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
        alert(Array.isArray(json.errors) ? json.errors[0] : "خطا در ارسال پیام.");
      }
    } catch {
      setInput(text);
      alert("خطا در ارسال پیام.");
    } finally {
      setSendLoading(false);
    }
  };

  if (step === "form") {
    return (
      <main className="min-h-screen bg-gray-50/40 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">چت پشتیبانی</h1>
          <p className="text-slate-500 text-sm mb-6">نام، نام خانوادگی و شماره تلفن خود را وارد کنید تا مکالمه شروع شود.</p>
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {errors.length > 0 && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 text-sm p-3">
                {errors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">نام</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                placeholder="نام"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">نام خانوادگی</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                placeholder="نام خانوادگی"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">شماره تلفن</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 px-4 transition disabled:opacity-50"
            >
              {loading ? "در حال ثبت..." : "شروع چت"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/40 flex flex-col p-4">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1 min-h-0 rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-slate-50">
          <h1 className="text-lg font-bold text-slate-800">چت پشتیبانی</h1>
          <p className="text-slate-500 text-sm">پشتیبانان به زودی پاسخ می‌دهند.</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
          {messagesLoading ? (
            <div className="flex justify-center py-8 text-slate-500">در حال بارگذاری...</div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.senderType === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    m.senderType === "user"
                      ? "bg-slate-200 text-slate-800 rounded-tl-none"
                      : "bg-cyan-600 text-white rounded-tr-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{m.content}</p>
                  <p className={`text-xs mt-1 ${m.senderType === "user" ? "text-slate-500" : "text-cyan-100"}`}>
                    {new Date(m.createdAt).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none"
              maxLength={2000}
              disabled={sendLoading}
            />
            <button
              type="submit"
              disabled={sendLoading || !input.trim()}
              className="rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-5 py-2.5 disabled:opacity-50 transition"
            >
              {sendLoading ? "..." : "ارسال"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
