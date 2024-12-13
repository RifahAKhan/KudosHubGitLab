/*
  Warnings:

  - You are about to drop the column `sender` on the `Kudos` table. All the data in the column will be lost.
  - Added the required column `giver` to the `Kudos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kudos" DROP COLUMN "sender",
ADD COLUMN     "giver" TEXT NOT NULL;
