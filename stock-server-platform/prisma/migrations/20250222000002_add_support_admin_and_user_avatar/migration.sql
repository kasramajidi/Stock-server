-- AlterTable (User: avatar for admin profile in support chat)
ALTER TABLE "users" ADD COLUMN "avatar_url" TEXT;

-- AlterTable (SupportMessage: which admin sent this message)
ALTER TABLE "support_messages" ADD COLUMN "admin_id" TEXT;

-- AddForeignKey
ALTER TABLE "support_messages" ADD CONSTRAINT "support_messages_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
