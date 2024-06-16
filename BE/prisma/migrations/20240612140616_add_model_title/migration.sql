/*
  Warnings:

  - You are about to drop the column `title` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `todo` table. All the data in the column will be lost.
  - Added the required column `titleId` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_userId_fkey";

-- AlterTable
ALTER TABLE "todo" DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ADD COLUMN     "titleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "todoTitle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "todoTitle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todoTitle" ADD CONSTRAINT "todoTitle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "todoTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
