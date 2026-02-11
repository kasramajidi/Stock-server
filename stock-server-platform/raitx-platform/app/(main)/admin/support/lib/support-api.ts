const API = "/api/support";

export type ConversationListItem = {
  id: string;
  clientId: string;
  userName?: string;
  userPhone?: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  lastMessage: { text: string; createdAt: string } | null;
};

export type MessageItem = {
  id: string;
  conversationId: string;
  sender: "user" | "admin";
  text: string;
  createdAt: string;
};

const fetchOpts = { credentials: "include" as RequestCredentials };

export async function fetchConversations(): Promise<ConversationListItem[]> {
  const res = await fetch(API + "/conversations", fetchOpts);
  if (res.status === 401) throw new Error("لطفاً وارد پنل ادمین شوید تا لیست مکالمات نمایش داده شود.");
  if (!res.ok) throw new Error("خطا در دریافت لیست مکالمات");
  return res.json();
}

export async function fetchMessages(conversationId: string): Promise<MessageItem[]> {
  const res = await fetch(
    API + "/messages?conversationId=" + encodeURIComponent(conversationId),
    fetchOpts
  );
  if (!res.ok) throw new Error("خطا در دریافت پیام‌ها");
  const data = await res.json();
  return data.messages ?? [];
}

export async function sendAdminMessage(conversationId: string, text: string): Promise<MessageItem> {
  const res = await fetch(API + "/messages", {
    ...fetchOpts,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, sender: "admin", text }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ارسال پیام");
  }
  const data = await res.json();
  return data.message;
}
