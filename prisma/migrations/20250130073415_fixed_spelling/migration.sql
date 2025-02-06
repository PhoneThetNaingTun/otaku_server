/*
  Warnings:

  - You are about to drop the column `chatper_no` on the `Chapter` table. All the data in the column will be lost.
  - Added the required column `chapter_no` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "chatper_no",
ADD COLUMN     "chapter_no" INTEGER NOT NULL;
