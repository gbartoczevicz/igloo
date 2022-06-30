-- CreateTable
CREATE TABLE "learning_trails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,

    CONSTRAINT "learning_trails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "learning_trails" ADD CONSTRAINT "learning_trails_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
