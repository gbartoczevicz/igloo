-- CreateTable
CREATE TABLE "institution_managers" (
    "user_id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "institution_managers_user_id_institution_id_key" ON "institution_managers"("user_id", "institution_id");

-- AddForeignKey
ALTER TABLE "institution_managers" ADD CONSTRAINT "institution_managers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institution_managers" ADD CONSTRAINT "institution_managers_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
