import express from "express";
import { prisma } from "../util/prisma";

export const getPagesByMangaSeasonChapterId = async (
  req: express.Request,
  res: express.Response
) => {
  const mangaSeasonChapterId = req.query.mangaSeasonChapterId as string;
  try {
    if (!mangaSeasonChapterId) {
      res.status(400).json({ error: "Manga season chapter ID is required" });
      return;
    }
    const pages = await prisma.page.findMany({
      where: {
        mangaSeasonChapterId,
      },
    });
    res.status(200).json({ pages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
