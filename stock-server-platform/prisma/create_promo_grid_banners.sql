-- ایجاد جدول promo_grid_banners
-- این فایل را در PostgreSQL اجرا کنید یا از Prisma Studio / db push استفاده کنید

CREATE TABLE IF NOT EXISTS "promo_grid_banners" (
  "id" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  "image_url" TEXT NOT NULL,
  "alt" TEXT,
  "link" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "promo_grid_banners_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "promo_grid_banners_position_key" ON "promo_grid_banners"("position");
