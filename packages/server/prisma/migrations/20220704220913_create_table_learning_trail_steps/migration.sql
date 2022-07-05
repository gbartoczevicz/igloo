-- CreateTable
CREATE TABLE "learning_trail_steps" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "learning_trail_id" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "available_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_trail_steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "learning_trail_steps" ADD CONSTRAINT "learning_trail_steps_learning_trail_id_fkey" FOREIGN KEY ("learning_trail_id") REFERENCES "learning_trails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
