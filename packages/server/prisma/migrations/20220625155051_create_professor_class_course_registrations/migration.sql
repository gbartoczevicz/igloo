-- CreateTable
CREATE TABLE "professor_class_course_registrations" (
    "id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "class_course_id" TEXT NOT NULL,

    CONSTRAINT "professor_class_course_registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "professor_class_course_registrations" ADD CONSTRAINT "professor_class_course_registrations_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor_class_course_registrations" ADD CONSTRAINT "professor_class_course_registrations_class_course_id_fkey" FOREIGN KEY ("class_course_id") REFERENCES "class_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
