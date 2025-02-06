/*
  Warnings:

  - You are about to drop the column `chapter_no` on the `Chapter` table. All the data in the column will be lost.
  - Added the required column `chapter` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "chapter_no",
ADD COLUMN     "chapter" TEXT NOT NULL;
