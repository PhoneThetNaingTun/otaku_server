import express from "express";
import { prisma } from "../util/prisma";

export const getMangas = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mangas = await prisma.manga.findMany({
      include: {
        author: true,
      },
    });
    res.status(200).json({ mangas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLatestMangas = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mangas = await prisma.manga.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
    res.status(200).json({ mangas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMostRatedMangas = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mostRatedMangas = await prisma.rating_Review.findMany({
      take: 10,
      where: {
        OR: [{ rating: { not: 0 } }, { review: { not: "" } }],
      },
      orderBy: [{ rating: "desc" }, { review: "desc" }],
      include: { manga: true },
    });
    const mangaIds = [...new Set(mostRatedMangas.map((item) => item.mangaId))];
    const mangas = await prisma.manga.findMany({
      where: {
        id: {
          in: mangaIds,
        },
      },
      include: { author: true },
    });

    res.status(200).json({ mangas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMangaById = async (
  req: express.Request,
  res: express.Response
) => {
  const mangaId = req.query.mangaId as string;
  try {
    if (!mangaId) {
      res.status(400).json({ error: "Manga ID is required" });
      return;
    }
    const manga = await prisma.manga.findFirst({
      where: { id: mangaId },
      include: {
        author: true,
      },
    });
    if (!manga) {
      res.status(400).json({ error: "Manga does not exist" });
      return;
    }
    const mangaCategories = await prisma.manga_Category.findMany({
      where: { mangaId: manga.id },
      include: {
        category: true,
      },
    });
    const mangaSeasons = await prisma.manga_Season.findMany({
      where: { mangaId: manga.id },
      include: { season: true },
    });
    const numberOfChapters = await prisma.manga_Season_Chapter.count({
      where: { mangaSeasonId: { in: mangaSeasons.map((item) => item.id) } },
    });
    const rating = await prisma.rating_Review.aggregate({
      where: { mangaId },
      _avg: { rating: true },
    });
    const calcRating = rating._avg.rating || 0;
    const mangaWithChapters = {
      ...manga,
      numOfChapter: numberOfChapters,
      rating: calcRating,
    };
    res.status(200).json({
      mangaWithChapters,
      mangaCategories,
      mangaSeasons,
      numberOfChapters,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMangaByPage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const mangas = await prisma.manga.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalMangas = await prisma.manga.count();

    res.json({
      data: mangas,
      currentPage: page,
      totalPages: Math.ceil(totalMangas / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMangaByCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.query.id as string;
  try {
    const mangaCategoies = await prisma.manga_Category.findMany({
      where: { categoryId: id },
      include: { manga: { include: { author: true } } },
    });
    const category = await prisma.category.findFirst({
      where: { id },
    });
    const mangas = mangaCategoies.map((item) => item.manga);

    res.status(200).json({ mangas, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
