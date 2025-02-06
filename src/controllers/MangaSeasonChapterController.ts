import express from "express";
import { prisma } from "../util/prisma";

export const getMangaSeasonChapters = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mangaSeasonChapters = await prisma.manga_Season_Chapter.findMany();
    res.status(200).json({ mangaSeasonChapters });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMangaSeasonChapter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { mangaSeasonId, chapterId } = req.body;
    if (!mangaSeasonId || !chapterId) {
      res
        .status(400)
        .json({ error: "Manga Season ID and Chapter ID are required" });
      return;
    }
    const isExist = await prisma.manga_Season_Chapter.findFirst({
      where: { mangaSeasonId, chapterId },
    });
    if (isExist) {
      res.status(400).json({ error: "Manga Season Chapter already exists" });
      return;
    }
    const newMangaSeasonChapter = await prisma.manga_Season_Chapter.create({
      data: { mangaSeasonId, chapterId },
    });

    res.status(200).json({
      newMangaSeasonChapter,
      message: "Chaapter added successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMangaSeasonChapter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "ID is required" });
      return;
    }
    const isExist = await prisma.manga_Season_Chapter.findFirst({
      where: { id },
    });
    if (!isExist) {
      res.status(400).json({ error: "Manga Season Chapter not found" });
      return;
    }
    await prisma.manga_Season_Chapter.delete({ where: { id } });
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
