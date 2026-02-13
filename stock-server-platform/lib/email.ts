import nodemailer from "nodemailer";

const COMPANY_EMAIL = "kasramajidy81@gmail.com";
const SITE_NAME = "استوک سرور";
const SITE_FOOTER = "این ایمیل به صورت خودکار از سامانه استوک سرور ارسال شده است.";

function getTransporter() {
  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT) || 587;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  if (!host || !user || !pass) {
    return null;
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Email] MAIL_* not set, skipping send");
    return false;
  }
  const from = process.env.MAIL_FROM || process.env.MAIL_USER || "noreply@stock-server.ir";
  try {
    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html ?? options.text.replace(/\n/g, "<br>"),
    });
    return true;
  } catch (e) {
    console.error("[Email] send failed:", e);
    return false;
  }
}

/** ایمیل به شرکت هنگام ثبت پرسش جدید */
export async function notifyCompanyNewInquiry(data: {
  fullName: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const date = new Date().toLocaleDateString("fa-IR", { dateStyle: "long" });
  const time = new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  const text = [
    `پرسش / تماس جدید از طریق فرم سایت`,
    ``,
    `تاریخ: ${date} - ساعت: ${time}`,
    `────────────────────────────`,
    `نام و نام خانوادگی: ${data.fullName}`,
    `ایمیل: ${data.email}`,
    ``,
    `متن پیام:`,
    data.message,
    ``,
    `────────────────────────────`,
    SITE_FOOTER,
  ].join("\n");
  const html = [
    `<p><strong>پرسش / تماس جدید</strong> از طریق فرم سایت</p>`,
    `<p>تاریخ: ${date} — ساعت: ${time}</p>`,
    `<hr style="border:0;border-top:1px solid #eee;">`,
    `<p><strong>نام و نام خانوادگی:</strong> ${escapeHtml(data.fullName)}</p>`,
    `<p><strong>ایمیل:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>`,
    `<p><strong>متن پیام:</strong></p>`,
    `<p style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;">${escapeHtml(data.message)}</p>`,
    `<hr style="border:0;border-top:1px solid #eee;">`,
    `<p style="color:#888;font-size:12px;">${SITE_FOOTER}</p>`,
  ].join("");
  return sendEmail({
    to: COMPANY_EMAIL,
    subject: `[${SITE_NAME}] پرسش جدید از ${data.fullName}`,
    text,
    html,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** ایمیل به کاربر با پاسخ ادمین (تایید/رد) */
export async function sendResponseToUser(options: {
  to: string;
  fullName: string;
  status: "approved" | "rejected";
  adminResponse?: string | null;
}): Promise<boolean> {
  const statusText = options.status === "approved" ? "تایید شده" : "بررسی شده";
  const bodyLines = options.adminResponse
    ? ["پاسخ کارشناسان ما:", "", options.adminResponse]
    : [`درخواست شما با وضعیت «${statusText}» ثبت شده است. در صورت نیاز با شما تماس خواهیم گرفت.`];
  const text = [
    `سلام ${options.fullName}،`,
    ``,
    `با تشکر از تماس شما با ${SITE_NAME}.`,
    ``,
    ...bodyLines,
    ``,
    `با احترام،`,
    `تیم پشتیبانی ${SITE_NAME}`,
    ``,
    SITE_FOOTER,
  ].join("\n");
  const html = [
    `<p>سلام <strong>${escapeHtml(options.fullName)}</strong>،</p>`,
    `<p>با تشکر از تماس شما با <strong>${SITE_NAME}</strong>.</p>`,
    options.adminResponse
      ? `<p><strong>پاسخ کارشناسان ما:</strong></p><p style="white-space:pre-wrap;background:#f0f9ff;padding:12px;border-radius:8px;border-right:4px solid #0ea5e9;">${escapeHtml(options.adminResponse)}</p>`
      : `<p>درخواست شما با وضعیت <strong>${statusText}</strong> ثبت شده است. در صورت نیاز با شما تماس خواهیم گرفت.</p>`,
    `<p>با احترام،<br>تیم پشتیبانی ${SITE_NAME}</p>`,
    `<p style="color:#888;font-size:12px;">${SITE_FOOTER}</p>`,
  ].join("");
  return sendEmail({
    to: options.to,
    subject: `[${SITE_NAME}] پاسخ به پرسش شما — ${statusText}`,
    text,
    html,
  });
}

/** ایمیل به کارفرما/شرکت هنگام ثبت کامنت جدید روی یک محصول */
export async function notifyCompanyNewProductComment(data: {
  userFullName: string;
  productTitle: string;
  productCategory?: string;
  commentContent: string;
  productId: string;
}): Promise<boolean> {
  const date = new Date().toLocaleDateString("fa-IR", { dateStyle: "long" });
  const time = new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  const text = [
    `کامنت جدید روی محصول`,
    ``,
    `تاریخ: ${date} - ساعت: ${time}`,
    `────────────────────────────`,
    `کاربر: ${data.userFullName}`,
    `محصول: ${data.productTitle}`,
    ...(data.productCategory ? [`دسته: ${data.productCategory}`] : []),
    ``,
    `متن کامنت:`,
    data.commentContent,
    ``,
    `────────────────────────────`,
    `برای مشاهده و تایید/رد به پنل مدیریت مراجعه کنید. (محصول: ${data.productId})`,
    ``,
    SITE_FOOTER,
  ].join("\n");
  const html = [
    `<p><strong>کامنت جدید روی محصول</strong></p>`,
    `<p>تاریخ: ${date} — ساعت: ${time}</p>`,
    `<hr style="border:0;border-top:1px solid #eee;">`,
    `<p><strong>کاربر:</strong> ${escapeHtml(data.userFullName)}</p>`,
    `<p><strong>محصول:</strong> ${escapeHtml(data.productTitle)}</p>`,
    ...(data.productCategory ? [`<p><strong>دسته:</strong> ${escapeHtml(data.productCategory)}</p>`] : []),
    `<p><strong>متن کامنت:</strong></p>`,
    `<p style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;">${escapeHtml(data.commentContent)}</p>`,
    `<hr style="border:0;border-top:1px solid #eee;">`,
    `<p style="color:#666;font-size:13px;">برای مشاهده و تایید/رد به پنل مدیریت مراجعه کنید.</p>`,
    `<p style="color:#888;font-size:12px;">${SITE_FOOTER}</p>`,
  ].join("");
  return sendEmail({
    to: COMPANY_EMAIL,
    subject: `[${SITE_NAME}] کامنت جدید روی محصول: ${data.productTitle}`,
    text,
    html,
  });
}

/** اطلاع‌رسانی مقاله جدید به همه اعضای ثبت‌نام‌شده — هر کاربر یک ایمیل جدا دریافت می‌کند */
export async function notifyUsersNewArticle(options: {
  fullName: string;
  to: string;
  articleTitle: string;
  articleExcerpt: string;
  articleUrl?: string;
}): Promise<boolean> {
  const { fullName, to, articleTitle, articleExcerpt, articleUrl } = options;
  const text = [
    `سلام ${fullName}،`,
    ``,
    `مقاله جدیدی در ${SITE_NAME} منتشر شده است.`,
    ``,
    `عنوان: ${articleTitle}`,
    ``,
    `خلاصه:`,
    articleExcerpt,
    ``,
    ...(articleUrl ? [`برای مطالعه به لینک زیر مراجعه کنید:\n${articleUrl}`] : ["برای مطالعه به سایت مراجعه کنید."]),
    ``,
    `با احترام،`,
    `تیم ${SITE_NAME}`,
    ``,
    SITE_FOOTER,
  ].join("\n");
  const html = [
    `<p>سلام <strong>${escapeHtml(fullName)}</strong>،</p>`,
    `<p>مقاله جدیدی در <strong>${SITE_NAME}</strong> منتشر شده است.</p>`,
    `<p><strong>عنوان:</strong> ${escapeHtml(articleTitle)}</p>`,
    `<p><strong>خلاصه:</strong></p>`,
    `<p style="background:#f5f5f5;padding:12px;border-radius:8px;">${escapeHtml(articleExcerpt)}</p>`,
    articleUrl
      ? `<p><a href="${escapeHtml(articleUrl)}" style="display:inline-block;background:#0ea5e9;color:#fff;padding:10px 20px;text-decoration:none;border-radius:8px;">مشاهده مقاله</a></p>`
      : `<p>برای مطالعه به سایت مراجعه کنید.</p>`,
    `<p>با احترام،<br>تیم ${SITE_NAME}</p>`,
    `<p style="color:#888;font-size:12px;">${SITE_FOOTER}</p>`,
  ].join("");
  return sendEmail({
    to,
    subject: `[${SITE_NAME}] مقاله جدید: ${articleTitle}`,
    text,
    html,
  });
}
