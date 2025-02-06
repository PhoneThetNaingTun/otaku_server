import express from "express";
import { prisma } from "../util/prisma";

export const getMangaBySearch = async (
  req: express.Request,
  res: express.Response
) => {
  const { search } = req.query;
  try {
    if (!search) {
      res.status(400).json({ error: "Search is required" });
      return;
    }
    const mangas = await prisma.manga.findMany({
      where: {
        manga_name: { contains: search as string, mode: "insensitive" },
      },
      include: {
        author: true,
      },
    });
    if (!mangas) {
      res.status(404).json({ error: "Manga not found" });
      return;
    }

    res.status(200).json({ mangas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
