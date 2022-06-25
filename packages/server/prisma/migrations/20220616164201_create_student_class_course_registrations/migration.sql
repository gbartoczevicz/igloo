-- CreateTable
CREATE TABLE "student_class_course_registrations" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "class_course_id" TEXT NOT NULL,

    CONSTRAINT "student_class_course_registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_class_course_registrations" ADD CONSTRAINT "student_class_course_registrations_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_class_course_registrations" ADD CONSTRAINT "student_class_course_registrations_class_course_id_fkey" FOREIGN KEY ("class_course_id") REFERENCES "class_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
