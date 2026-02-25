-- CreateTable
CREATE TABLE "hero_banners" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "alt" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hero_banners_pkey" PRIMARY KEY ("id")
);
