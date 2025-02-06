-- AddForeignKey
ALTER TABLE "Rating_Review" ADD CONSTRAINT "Rating_Review_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
