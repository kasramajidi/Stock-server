import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "registrations.json");

export interface RegistrationEntry {
  name: string;
  email: string;
  phone: string;
  at: string;
}

async function readRegistrations(): Promise<RegistrationEntry[]> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeRegistrations(entries: RegistrationEntry[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

/** لیست ثبت‌نام‌ها (فقط برای خودت) */
export async function GET() {
  try {
    const list = await readRegistrations();
    return NextResponse.json({
      count: list.length,
      registrations: list,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در خواندن لیست" },
      { status: 500 }
    );
  }
}

/** ذخیره یک ثبت‌نام جدید */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "name, email, phone لازم است" },
        { status: 400 }
      );
    }
    const list = await readRegistrations();
    list.unshift({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      at: new Date().toISOString(),
    });
    await writeRegistrations(list);
    return NextResponse.json({ ok: true, count: list.length });
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در ذخیره" },
      { status: 500 }
    );
  }
}

/** حذف یک کاربر (index) یا پاک کردن همه (بدون query) */
export async function DELETE(request: Request) {
  try {
    const list = await readRegistrations();
    const { searchParams } = new URL(request.url);
    const indexStr = searchParams.get("index");
    if (indexStr !== null) {
      const index = parseInt(indexStr, 10);
      if (Number.isNaN(index) || index < 0 || index >= list.length) {
        return NextResponse.json(
          { error: "index نامعتبر" },
          { status: 400 }
        );
      }
      list.splice(index, 1);
    } else {
      list.length = 0;
    }
    await writeRegistrations(list);
    return NextResponse.json({ ok: true, count: list.length });
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در حذف" },
      { status: 500 }
    );
  }
}

/** ویرایش یک کاربر با index */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { index: indexVal, name, email, phone } = body;
    const index = typeof indexVal === "number" ? indexVal : parseInt(String(indexVal), 10);
    if (Number.isNaN(index) || index < 0) {
      return NextResponse.json(
        { error: "index معتبر لازم است" },
        { status: 400 }
      );
    }
    const list = await readRegistrations();
    if (index >= list.length) {
      return NextResponse.json(
        { error: "کاربر یافت نشد" },
        { status: 404 }
      );
    }
    if (name !== undefined) list[index].name = String(name).trim();
    if (email !== undefined) list[index].email = String(email).trim();
    if (phone !== undefined) list[index].phone = String(phone).trim();
    await writeRegistrations(list);
    return NextResponse.json({ ok: true, registrations: list });
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در ویرایش" },
      { status: 500 }
    );
  }
}
