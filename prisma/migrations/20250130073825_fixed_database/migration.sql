/*
  Warnings:

  - You are about to drop the column `mangaSeasonId` on the `Chapter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_mangaSeasonId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "mangaSeasonId";

-- CreateTable
CREATE TABLE "Manga_Season_Chapter" (
    "id" TEXT NOT NULL,
    "mangaSeasonId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manga_Season_Chapter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Manga_Season_Chapter" ADD CONSTRAINT "Manga_Season_Chapter_mangaSeasonId_fkey" FOREIGN KEY ("mangaSeasonId") REFERENCES "Manga_Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga_Season_Chapter" ADD CONSTRAINT "Manga_Season_Chapter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
