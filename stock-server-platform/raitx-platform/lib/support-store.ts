/**
 * ذخیرهٔ مکالمات پشتیبانی با پایداری در فایل.
 * مکالمات تا نیم ساعت نگه داشته می‌شوند؛ بعد از آن پاک می‌شوند.
 * در پروداکشن با چند نمونه سرور بهتر است از دیتابیس استفاده شود.
 */

import fs from "fs";
import path from "path";
import os from "os";

const RETENTION_MS = 30 * 60 * 1000; // نیم ساعت — بعد از آن مکالمات پاک می‌شوند

export type Message = {
  id: string;
  conversationId: string;
  sender: "user" | "admin";
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  clientId: string;
  userName?: string;
  userPhone?: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};

const conversations = new Map<string, Conversation>();

/** کش در حافظه: حداکثر هر ۱ ثانیه یک بار از فایل بخوان تا صفحه ادمین کنده نشود */
const CACHE_TTL_MS = 1000;
let lastLoadTime = 0;

function getStoragePath(): string {
  const useTmp = typeof process.env.VERCEL !== "undefined" || typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== "undefined";
  const dir = useTmp ? os.tmpdir() : path.join(process.cwd(), ".data");
  return path.join(dir, "support-conversations.json");
}

function pruneOld(): void {
  const now = Date.now();
  const cutoff = now - RETENTION_MS;
  for (const [id, c] of conversations.entries()) {
    if (new Date(c.updatedAt).getTime() < cutoff) {
      conversations.delete(id);
    }
  }
}

/** هر بار از فایل می‌خواند تا آخرین دادهٔ ذخیره‌شده در ادمین دیده شود */
function loadFromFile(): void {
  try {
    const filePath = getStoragePath();
    if (!fs.existsSync(filePath)) return;
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as { conversations?: unknown };
    const list = Array.isArray(data.conversations) ? data.conversations : [];
    conversations.clear();
    for (const c of list) {
      const item = c as Conversation;
      if (item?.id && item?.clientId && Array.isArray(item.messages)) {
        conversations.set(item.id, {
          id: item.id,
          clientId: item.clientId,
          userName: item.userName,
          userPhone: item.userPhone,
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
          messages: item.messages || [],
        });
      }
    }
    pruneOld();
  } catch {
    // اگر فایل خراب یا نامعتبر بود، حافظه را خالی نکن
  }
}

function saveToFile(): void {
  try {
    pruneOld();
    const filePath = getStoragePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const list = Array.from(conversations.values());
    fs.writeFileSync(
      filePath,
      JSON.stringify({ conversations: list }, null, 0),
      "utf-8"
    );
  } catch {
    // در محیط سرور بدون دیسک (مثل Vercel) ممکن است نوشتن ناموفق باشد
  }
}

function ensureLoaded(): void {
  const now = Date.now();
  if (now - lastLoadTime < CACHE_TTL_MS) return;
  lastLoadTime = now;
  loadFromFile();
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function createConversation(clientId: string, userName?: string, userPhone?: string): Conversation {
  ensureLoaded();
  const id = generateId();
  const now = new Date().toISOString();
  const conv: Conversation = {
    id,
    clientId,
    userName,
    userPhone,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
  conversations.set(id, conv);
  saveToFile();
  return conv;
}

export function getConversation(id: string): Conversation | undefined {
  ensureLoaded();
  return conversations.get(id);
}

export function getConversationByClientId(clientId: string): Conversation | undefined {
  ensureLoaded();
  for (const c of conversations.values()) {
    if (c.clientId === clientId) return c;
  }
  return undefined;
}

export function listConversations(): Conversation[] {
  ensureLoaded();
  return Array.from(conversations.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function addMessage(
  conversationId: string,
  sender: "user" | "admin",
  text: string
): Message | null {
  ensureLoaded();
  const conv = conversations.get(conversationId);
  if (!conv) return null;
  const id = generateId();
  const now = new Date().toISOString();
  const msg: Message = { id, conversationId, sender, text, createdAt: now };
  conv.messages.push(msg);
  conv.updatedAt = now;
  saveToFile();
  return msg;
}

export function getMessages(conversationId: string): Message[] {
  ensureLoaded();
  const conv = conversations.get(conversationId);
  return conv ? [...conv.messages] : [];
}
