-- برای رفع خطای 500 در /api/products این کوئری‌ها را روی دیتابیس اجرا کنید.
-- می‌توانید در Render Dashboard > Database > Connect > PSQL این دستورات را بزنید.

ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "offer_discount_percent" INTEGER;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "price" INTEGER;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "original_price" INTEGER;
