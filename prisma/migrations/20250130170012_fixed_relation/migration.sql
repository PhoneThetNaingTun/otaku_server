-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_mangaSeasonChapterId_fkey";

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_mangaSeasonChapterId_fkey" FOREIGN KEY ("mangaSeasonChapterId") REFERENCES "Manga_Season_Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
