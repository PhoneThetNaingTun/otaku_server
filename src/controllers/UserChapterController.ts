import express from "express";
import { prisma } from "../util/prisma";

export const getChapterByMangaSeasonId = async (
  req: express.Request,
  res: express.Response
) => {
  const mangaSeasonId = req.query.mangaSeasonId as string;
  try {
    if (!mangaSeasonId) {
      res.status(400).json({ error: "Manga season ID is required" });
      return;
    }
    const mangaSeason = await prisma.manga_Season.findFirst({
      where: { id: mangaSeasonId },
      include: { season: true },
    });
    if (!mangaSeason) {
      res.status(404).json({ error: "Manga season not found" });
      return;
    }
    const mangaSeasonChapters = await prisma.manga_Season_Chapter.findMany({
      where: {
        mangaSeasonId,
      },
      include: { chapter: true },
    });
    const pages = await prisma.page.findMany({
      where: {
        mangaSeasonChapterId: {
          in: mangaSeasonChapters.map((item) => item.id),
        },
      },
    });

    const mangaSeasonChapterWithPageCount = await Promise.all(
      mangaSeasonChapters.map(async (chapter) => {
        const pageCount = await prisma.page.count({
          where: {
            mangaSeasonChapterId: chapter.id,
          },
        });

        return {
          ...chapter,
          pageCount,
        };
      })
    );
    res.status(200).json({ mangaSeasonChapterWithPageCount, mangaSeason });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
