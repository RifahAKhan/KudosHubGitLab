-- CreateTable
CREATE TABLE "Kudos" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kudos_pkey" PRIMARY KEY ("id")
);
