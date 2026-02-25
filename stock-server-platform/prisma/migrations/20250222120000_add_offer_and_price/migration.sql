-- AlterTable
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "offer_discount_percent" INTEGER;

ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "price" INTEGER;

ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "original_price" INTEGER;
