/*
  Warnings:

  - You are about to drop the `produk` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `fullname` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "produk" DROP CONSTRAINT "produk_authorId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profile" TEXT,
ALTER COLUMN "fullname" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- DropTable
DROP TABLE "produk";

-- CreateTable
CREATE TABLE "todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todoImage" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "todoId" TEXT NOT NULL,

    CONSTRAINT "todoImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todoImage" ADD CONSTRAINT "todoImage_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
