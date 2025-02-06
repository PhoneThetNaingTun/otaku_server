import express from "express";
import { prisma } from "../util/prisma";

// create Season for Manga

export const createMangaSeason = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { mangaId, seasonId } = req.body;
    if (!mangaId || !seasonId) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const isExist = await prisma.manga_Season.findFirst({
      where: { mangaId, seasonId },
      include: { manga: true, season: true },
    });
    if (isExist) {
      res.status(400).json({
        error: `${isExist.manga.manga_name} already exists with ${isExist.season.season}`,
      });
      return;
    }
    const newMangaSeason = await prisma.manga_Season.create({
      data: { mangaId, seasonId },
      include: { manga: true, season: true },
    });
    res.status(201).json({
      newMangaSeason,
      message: `${newMangaSeason.season.season} created in ${newMangaSeason.manga.manga_name} successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Season for Manga

export const deleteMangaSeason = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: " ID is required" });
      return;
    }
    const isExist = await prisma.manga_Season.findFirst({
      where: { id },
      include: { manga: true, season: true },
    });
    if (!isExist) {
      res.status(400).json({ error: "Season not found" });
      return;
    }
    const deleteManga = await prisma.manga_Season.delete({
      where: { id },
      include: { manga: true, season: true },
    });
    res.status(200).json({
      deleteManga,
      message: `${deleteManga.season.season} deleted from ${deleteManga.manga.manga_name} successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get manga seasons

export const getMangaSeasonsByManga = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mangaId = req.query.mangaId as string;
    if (!mangaId) {
      res.status(400).json({ error: "Manga ID is required" });
      return;
    }
    const mangaSeasons = await prisma.manga_Season.findMany({
      where: { mangaId },
      include: { manga: true, season: true },
    });
    res.status(200).json({ mangaSeasons });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
