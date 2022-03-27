/*
  Warnings:

  - A unique constraint covering the columns `[institution_id]` on the table `institution_managers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "institution_managers_user_id_institution_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "institution_managers_institution_id_key" ON "institution_managers"("institution_id");
