-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "fullname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk" (
    "id" TEXT NOT NULL,
    "produk_name" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "produk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produk" ADD CONSTRAINT "produk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
