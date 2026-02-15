/**
 * تنظیم یک کاربر به عنوان ادمین کل (super_admin) بر اساس شماره موبایل
 * اجرا: node scripts/set-super-admin.mjs 09123456789
 */
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const envPath = join(root, ".env");
if (existsSync(envPath)) {
  const env = readFileSync(envPath, "utf8");
  env.split("\n").forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  });
}

const mobile = process.argv[2];
if (!mobile) {
  console.log("استفاده: node scripts/set-super-admin.mjs <شماره موبایل>");
  process.exit(1);
}

const normalized = mobile.replace(/\s/g, "").replace(/^\+98/, "0");

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

try {
  const result = await prisma.user.updateMany({
    where: { mobile: normalized },
    data: { role: "super_admin" },
  });
  if (result.count === 0) {
    console.log("❌ کاربری با این شماره یافت نشد:", normalized);
    process.exit(1);
  }
  console.log("✅ کاربر با شماره", normalized, "به ادمین کل (super_admin) تغییر کرد.");
} catch (e) {
  console.error("خطا:", e.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
