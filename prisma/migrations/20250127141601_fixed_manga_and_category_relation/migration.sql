/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Manga` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_categoryId_fkey";

-- AlterTable
ALTER TABLE "Manga" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "Manga_Category" (
    "id" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manga_Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Manga_Category" ADD CONSTRAINT "Manga_Category_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga_Category" ADD CONSTRAINT "Manga_Category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
