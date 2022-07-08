-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "learning_trail_step_id" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exams_learning_trail_step_id_key" ON "exams"("learning_trail_step_id");

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_learning_trail_step_id_fkey" FOREIGN KEY ("learning_trail_step_id") REFERENCES "learning_trail_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
