-- اجرای این فایل روی دیتابیس PostgreSQL (مثلاً در Render > Shell یا pgAdmin)
-- برای رفع خطای: The column support_conversations.support_seen_at does not exist

-- اضافه کردن support_seen_at در صورت نبودن
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'support_conversations' AND column_name = 'support_seen_at'
  ) THEN
    ALTER TABLE "support_conversations" ADD COLUMN "support_seen_at" TIMESTAMP(3);
  END IF;
END $$;

-- اضافه کردن avatar_url به users در صورت نبودن
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE "users" ADD COLUMN "avatar_url" TEXT;
  END IF;
END $$;

-- اضافه کردن admin_id به support_messages در صورت نبودن
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'support_messages' AND column_name = 'admin_id'
  ) THEN
    ALTER TABLE "support_messages" ADD COLUMN "admin_id" TEXT;
  END IF;
END $$;

-- اضافه کردن foreign key در صورت نبودن
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'support_messages_admin_id_fkey'
  ) THEN
    ALTER TABLE "support_messages"
    ADD CONSTRAINT "support_messages_admin_id_fkey"
    FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
