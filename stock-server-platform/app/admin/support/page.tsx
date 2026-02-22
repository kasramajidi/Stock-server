"use client";

import React, { useState, useEffect, useRef } from "react";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { MessageCircle, RefreshCw, Send } from "lucide-react";

type ConversationRow = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: {
    content: string;
    senderType: string;
    createdAt: string;
  } | null;
};

type Message = {
  id: string;
  senderType: string;
  content: string;
  createdAt: string;
};

type ConversationDetail = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
};

export default function AdminSupportPage() {
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ConversationDetail | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadConversations = () => {
    setLoading(true);
    adminFetch<{ conversations?: ConversationRow[] }>("/api/admin/support/conversations")
      .then(({ data, ok }) => {
        if (ok && data?.conversations) setConversations(data.conversations);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const loadMessages = (silent = false) => {
    if (!selectedId) return;
    if (!silent) setMessagesLoading(true);
    adminFetch<{
      conversation?: ConversationDetail;
      messages?: Message[];
    }>(`/api/admin/support/conversations/${selectedId}/messages`)
      .then(({ data, ok }) => {
        if (ok && data) {
          setDetail(data.conversation ?? null);
          setMessages(Array.isArray(data.messages) ? data.messages : []);
        }
      })
      .finally(() => {
        if (!silent) setMessagesLoading(false);
      });
  };

  useEffect(() => {
    if (!selectedId) {
      setDetail(null);
      setMessages([]);
      return;
    }
    loadMessages(false);
  }, [selectedId]);

  // بروزرسانی آنلاین: هر ۴ ثانیه پیام‌های جدید (از کاربر) را بی‌صدا بگیر
  useEffect(() => {
    if (!selectedId) return;
    const interval = setInterval(() => loadMessages(true), 4000);
    return () => clearInterval(interval);
  }, [selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = reply.trim();
    if (!text || !selectedId) return;
    setSendLoading(true);
    setReply("");
    try {
      const res = await fetch(
        `/api/admin/support/conversations/${selectedId}/messages`,
        {
          method: "POST",
          credentials: "include",
          headers: getAuthHeaders(),
          body: JSON.stringify({ content: text }),
        }
      );
      const json = await res.json().catch(() => ({}));
      if (json.success && json.message) {
        setMessages((prev) => [...prev, json.message]);
        loadConversations();
      } else {
        setReply(text);
        alert(Array.isArray(json?.errors) ? json.errors[0] : "خطا در ارسال پیام.");
      }
    } catch {
      setReply(text);
      alert("خطا در ارسال پیام.");
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-w-0 flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
      <div className="max-w-6xl mx-auto w-full min-w-0 flex-1 flex flex-col min-h-0" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">چت پشتیبانی</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">مکالمات کاربران و پاسخ به آن‌ها</p>
          </div>
          <button
            type="button"
            onClick={loadConversations}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-slate-300 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            بروزرسانی
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 overflow-hidden">
          {/* لیست مکالمات */}
          <div className="lg:col-span-1 flex flex-col min-h-0 border-l border-slate-300 dark:border-slate-700 lg:border-l-0 lg:border-r">
            <div className="p-3 border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">مکالمات</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading && conversations.length === 0 ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 rounded-lg bg-slate-300 dark:bg-slate-700/50 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-slate-300 dark:divide-slate-700">
                  {conversations.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full text-right p-4 transition-colors hover:bg-slate-200/80 dark:hover:bg-slate-700/40 ${
                        selectedId === c.id ? "bg-cyan-500/20 dark:bg-cyan-500/20" : ""
                      }`}
                    >
                      <p className="font-medium text-slate-800 dark:text-slate-100 truncate">
                        {c.firstName} {c.lastName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.phone}</p>
                      {c.lastMessage && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                          {c.lastMessage.content.slice(0, 50)}
                          {c.lastMessage.content.length > 50 ? "…" : ""}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {new Date(c.updatedAt).toLocaleDateString("fa-IR", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </button>
                  ))}
                  {conversations.length === 0 && !loading && (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                      هیچ مکالمه‌ای نیست.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ناحیه چت */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            {!selectedId ? (
              <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400 p-8">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>یک مکالمه از لیست انتخاب کنید.</p>
                </div>
              </div>
            ) : (
              <>
                {detail && (
                  <div className="p-4 border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50">
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                      {detail.firstName} {detail.lastName}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{detail.phone}</p>
                  </div>
                )}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[120px]">
                  {messagesLoading ? (
                    <div className="flex justify-center py-8 text-slate-500 dark:text-slate-400">در حال بارگذاری...</div>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.senderType === "support" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                            m.senderType === "support"
                              ? "bg-cyan-600 text-white rounded-tr-none"
                              : "bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-tl-none"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap wrap-break-word">{m.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              m.senderType === "support" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            {new Date(m.createdAt).toLocaleTimeString("fa-IR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendReply} className="p-4 border-t border-slate-300 dark:border-slate-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="پاسخ خود را بنویسید..."
                      className="flex-1 rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      maxLength={2000}
                      disabled={sendLoading}
                    />
                    <button
                      type="submit"
                      disabled={sendLoading || !reply.trim()}
                      className="flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-5 py-2.5 disabled:opacity-50 transition"
                    >
                      <Send className="h-4 w-4" />
                      ارسال
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
