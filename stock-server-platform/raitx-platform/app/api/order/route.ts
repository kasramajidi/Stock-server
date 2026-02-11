import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "orders.json");

export interface OrderItemPayload {
  productId: number;
  productName: string;
  quantity: number;
  finalPrice: number;
  selectedColor?: string;
  selectedWarranty?: string;
  productType?: string;
}

export interface OrderItemDetailPayload {
  fastOrder?: boolean;
  stepsDescription?: string;
}

export interface CreateOrderPayload {
  contact: { name: string; phone: string };
  company?: string;
  orderNotes?: string;
  items: OrderItemPayload[];
  orderDetails: Record<string, OrderItemDetailPayload>;
  paymentGateway: string;
  subtotal: number;
  fastOrderFee: number;
  total: number;
}

export interface StoredOrder extends CreateOrderPayload {
  id: string;
  createdAt: string;
  /** وضعیت سفارش برای پنل ادمین */
  status?: string;
  /** true بعد از پرداخت موفق از درگاه یا کیف پول */
  isPaid?: boolean;
}

async function readOrders(): Promise<StoredOrder[]> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeOrders(orders: StoredOrder[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(orders, null, 2), "utf-8");
}

function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** ثبت سفارش جدید: اطلاعات تماس، جزئیات صورتحساب، آیتم‌های سبد، جزئیات هر آیتم، روش پرداخت */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderPayload;
    const {
      contact,
      company,
      orderNotes,
      items,
      orderDetails,
      paymentGateway,
      subtotal,
      fastOrderFee,
      total,
    } = body;

    if (!contact?.name?.trim() || !contact?.phone?.trim()) {
      return NextResponse.json(
        { error: "نام و شماره تماس الزامی است" },
        { status: 400 }
      );
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "سبد خرید خالی است" },
        { status: 400 }
      );
    }

    const order: StoredOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: "در حال پردازش",
      isPaid: false,
      contact: {
        name: String(contact.name).trim(),
        phone: String(contact.phone).trim(),
      },
      company: company != null ? String(company).trim() : undefined,
      orderNotes: orderNotes != null ? String(orderNotes).trim() : undefined,
      items: items.map((item) => ({
        productId: Number(item.productId),
        productName: String(item.productName),
        quantity: Number(item.quantity) || 1,
        finalPrice: Number(item.finalPrice),
        selectedColor: item.selectedColor,
        selectedWarranty: item.selectedWarranty,
        productType: item.productType,
      })),
      orderDetails: orderDetails && typeof orderDetails === "object" ? orderDetails : {},
      paymentGateway: String(paymentGateway || "coordinate"),
      subtotal: Number(subtotal),
      fastOrderFee: Number(fastOrderFee) || 0,
      total: Number(total),
    };

    const orders = await readOrders();
    orders.unshift(order);
    await writeOrders(orders);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      message: "سفارش با موفقیت ثبت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.",
    });
  } catch (e) {
    console.error("Order API error:", e);
    return NextResponse.json(
      { error: "خطا در ثبت سفارش" },
      { status: 500 }
    );
  }
}

/** لیست سفارشات (برای ادمین یا گزارش) — تمام سفارشات تمام مشتریان */
export async function GET() {
  try {
    const orders = await readOrders();
    return NextResponse.json({
      count: orders.length,
      orders,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در خواندن سفارشات" },
      { status: 500 }
    );
  }
}

/** به‌روزرسانی وضعیت یک سفارش (ادمین یا بعد از پرداخت موفق درگاه/کیف‌پول) */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = (await request.json()) as { status?: string; isPaid?: boolean };
    if (!id?.trim()) {
      return NextResponse.json(
        { error: "شناسه سفارش (id) الزامی است" },
        { status: 400 }
      );
    }
    const orders = await readOrders();
    const index = orders.findIndex((o) => o.id === id.trim());
    if (index < 0) {
      return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });
    }
    const updated = { ...orders[index] };
    if (body.status != null && String(body.status).trim()) updated.status = String(body.status).trim();
    if (body.isPaid === true) {
      updated.isPaid = true;
      if (!updated.status || updated.status === "در حال پردازش") updated.status = "پرداخت شده";
    }
    orders[index] = updated;
    await writeOrders(orders);
    return NextResponse.json({ ok: true, order: orders[index] });
  } catch (e) {
    console.error("Order PATCH error:", e);
    return NextResponse.json(
      { error: "خطا در به‌روزرسانی سفارش" },
      { status: 500 }
    );
  }
}

/** حذف یک سفارش (ادمین) — با query id */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id?.trim()) {
      return NextResponse.json(
        { error: "شناسه سفارش (id) الزامی است" },
        { status: 400 }
      );
    }
    const orders = await readOrders();
    const index = orders.findIndex((o) => o.id === id.trim());
    if (index < 0) {
      return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });
    }
    orders.splice(index, 1);
    await writeOrders(orders);
    return NextResponse.json({ ok: true, message: "سفارش حذف شد" });
  } catch (e) {
    console.error("Order DELETE error:", e);
    return NextResponse.json(
      { error: "خطا در حذف سفارش" },
      { status: 500 }
    );
  }
}
