/*
  Warnings:

  - You are about to drop the `todoImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "todoImage" DROP CONSTRAINT "todoImage_todoId_fkey";

-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "todoImage" TEXT[];

-- DropTable
DROP TABLE "todoImage";
