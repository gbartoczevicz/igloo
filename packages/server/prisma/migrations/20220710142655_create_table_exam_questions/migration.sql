-- CreateTable
CREATE TABLE "exam_questions" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "exam_id" TEXT NOT NULL,

    CONSTRAINT "exam_questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exam_questions" ADD CONSTRAINT "exam_questions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
