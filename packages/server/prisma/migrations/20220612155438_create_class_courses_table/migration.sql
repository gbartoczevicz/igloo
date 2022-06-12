-- CreateTable
CREATE TABLE "class_courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "class_courses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_courses_start_course_id_key" ON "class_courses"("start", "course_id");

-- AddForeignKey
ALTER TABLE "class_courses" ADD CONSTRAINT "class_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
