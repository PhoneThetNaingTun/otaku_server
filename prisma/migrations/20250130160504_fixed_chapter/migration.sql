/*
  Warnings:

  - You are about to drop the column `chapterId` on the `Page` table. All the data in the column will be lost.
  - Added the required column `mangaSeasonChapterId` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_chapterId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "chapterId",
ADD COLUMN     "mangaSeasonChapterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_mangaSeasonChapterId_fkey" FOREIGN KEY ("mangaSeasonChapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
