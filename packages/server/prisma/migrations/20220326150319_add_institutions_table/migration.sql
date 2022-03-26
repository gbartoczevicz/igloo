-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_cnpj_key" ON "institutions"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_phone_key" ON "institutions"("phone");
