"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

const CHAT_COLOR = "#0d9488";
const CLIENT_ID_KEY = "support_chat_client_id";
const POLL_INTERVAL_MS = 4000;

type MessageItem = { id: string; sender: "user" | "admin"; text: string; createdAt: string };

function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = "c_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

async function fetchMessages(clientId: string): Promise<MessageItem[]> {
  const res = await fetch("/api/support/messages?clientId=" + encodeURIComponent(clientId));
  if (!res.ok) return [];
  const data = await res.json();
  return data.messages ?? [];
}

async function sendMessage(clientId: string, text: string, userName?: string, userPhone?: string): Promise<MessageItem | null> {
  const res = await fetch("/api/support/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId,
      sender: "user",
      text,
      userName: userName || undefined,
      userPhone: userPhone || undefined,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.message ?? null;
}

function formatTime(s: string): string {
  return new Date(s).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
}

/** شماره موبایل کامل: ۰۹xxxxxxxxx (۱۱ رقم) یا 9xxxxxxxxx (۱۰ رقم) */
function isPhoneComplete(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 11 && digits.startsWith("09")) || (digits.length === 10 && digits.startsWith("9"));
}

interface ChatWidgetProps {
  title?: string;
  welcomeMessage?: string;
  welcomeSubtext?: string;
  /** یک آواتار (همان رفتار قبلی) */
  avatarSrc?: string;
  /** چند آواتار برای ادمین‌ها — در هدر چت به‌صورت ردیف نمایش داده می‌شوند (حداکثر ۵ تا) */
  adminAvatars?: string[];
}

export default function ChatWidget({
  title = "پشتیبانی ريتكس",
  welcomeMessage = "سلام",
  welcomeSubtext = "چطور می‌تونم کمکتون کنم؟",
  avatarSrc,
  adminAvatars = [],
}: ChatWidgetProps) {
  const displayAvatars = adminAvatars.length > 0 ? adminAvatars.slice(0, 5) : (avatarSrc ? [avatarSrc] : []);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [chatUserName, setChatUserName] = useState("");
  const [chatUserPhone, setChatUserPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [clientId, setClientId] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    try {
      const loginPhone = localStorage.getItem("loginPhone");
      if (loginPhone?.trim()) setChatUserPhone((prev) => prev || loginPhone.trim());
      const raw = localStorage.getItem("cart_order_details_v1");
      if (raw) {
        const parsed = JSON.parse(raw) as { contact?: { name?: string; phone?: string } };
        if (parsed.contact) {
          if (parsed.contact.name) setChatUserName((prev) => prev || parsed.contact!.name || "");
          if (parsed.contact.phone) setChatUserPhone((prev) => prev || parsed.contact!.phone || "");
        }
      }
    } catch {
      // ignore
    }
  }, [open]);

  const loadMessages = useCallback(async () => {
    const cid = getOrCreateClientId();
    setClientId(cid);
    if (!cid) return;
    const list = await fetchMessages(cid);
    setMessages(list);
  }, []);

  useEffect(() => {
    if (open) {
      loadMessages();
    }
  }, [open, loadMessages]);

  useEffect(() => {
    if (!open || !clientId) return;
    const t = setInterval(() => loadMessages(), POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [open, clientId, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("[data-chat-launcher]")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const phoneComplete = isPhoneComplete(chatUserPhone);
  const contactFilled = Boolean(phoneComplete && chatUserName.trim());

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || !clientId || !contactFilled) return;
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    try {
      const userName = chatUserName.trim() || undefined;
      const userPhone = chatUserPhone.trim() || undefined;
      const msg = await sendMessage(clientId, text, userName, userPhone);
      if (msg) {
        setMessages((prev) => [...prev, msg]);
        setInputText("");
      }
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-0" dir="rtl">
      {open && (
        <div
          ref={cardRef}
          className="mb-3 w-[320px] sm:w-[340px] rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[420px]"
          role="dialog"
          aria-label="پنجره چت پشتیبانی"
        >
          <div
            className="flex items-center justify-between gap-2 px-4 py-3 text-white shrink-0"
            style={{ backgroundColor: CHAT_COLOR }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="بستن چت"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="font-medium text-sm flex-1 text-center truncate">{title}</span>
            <div className="flex items-center gap-1 shrink-0">
              {displayAvatars.length > 0 ? (
                displayAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30"
                    title={`پشتیبانی ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="shrink-0 border-b border-gray-100 bg-gray-50/50">
            <div className="p-3 pb-2">
              <p className="text-gray-800 font-medium text-sm">{welcomeMessage}</p>
              <p className="text-gray-600 text-sm mt-1">{welcomeSubtext}</p>
            </div>
            <div className="p-3 pt-0 space-y-2">
              <div>
                <label htmlFor="chat-phone" className="sr-only">شماره تماس</label>
                <input
                  id="chat-phone"
                  type="tel"
                  inputMode="numeric"
                  value={chatUserPhone}
                  onChange={(e) => setChatUserPhone(e.target.value)}
                  placeholder="شماره موبایل (۰۹۱۲۳۴۵۶۷۸۹)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-right placeholder-gray-500 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                />
              </div>
              {!phoneComplete && (
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                  شماره را کامل وارد کنید (۱۱ رقم با ۰۹) تا چت باز شود.
                </p>
              )}
              {phoneComplete && (
                <div>
                  <label htmlFor="chat-name" className="sr-only">نام و نام خانوادگی</label>
                  <input
                    id="chat-name"
                    type="text"
                    value={chatUserName}
                    onChange={(e) => setChatUserName(e.target.value)}
                    placeholder="نام و نام خانوادگی"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-right placeholder-gray-500 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                  />
                </div>
              )}
              {phoneComplete && !contactFilled && (
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                  نام خود را وارد کنید تا بتوانید پیام بفرستید.
                </p>
              )}
            </div>
          </div>
          {contactFilled && (
            <>
          <div className="flex-1 overflow-y-auto p-4 min-h-[140px] max-h-[340px] space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                    m.sender === "user"
                      ? "bg-[#0d9488] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      m.sender === "user" ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {formatTime(m.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-100 shrink-0 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-right focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputText.trim() || sending}
              className="rounded-lg px-3 py-2 text-white text-sm font-medium disabled:opacity-50 shrink-0"
              style={{ backgroundColor: CHAT_COLOR }}
            >
              {sending ? "..." : "ارسال"}
            </button>
          </div>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        data-chat-launcher
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
        style={{ backgroundColor: CHAT_COLOR }}
        aria-label={open ? "بستن چت پشتیبانی" : "باز کردن چت پشتیبانی"}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    </div>
  );
}
