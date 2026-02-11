import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-8xl font-bold text-[#00DDFF]/20 select-none">۴۰۴</p>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        صفحه پیدا نشد
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        آدرسی که وارد کرده‌اید وجود ندارد یا حذف شده است.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-[#17e2fe] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#14c8e0]"
        >
          صفحه اصلی
        </Link>
        <Link
          href="/shop"
          className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          فروشگاه
        </Link>
      </div>
    </div>
  );
}
