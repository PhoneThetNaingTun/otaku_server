import express from "express";
import { prisma } from "../util/prisma";
import cloudinary from "../config/cloudinary";

export const getMangas = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mangas = await prisma.manga.findMany({ include: { author: true } });
    const mangaCategories = await prisma.manga_Category.findMany({
      where: { mangaId: { in: mangas.map((item) => item.id) } },
      include: { category: true },
    });

    res.status(200).json({ mangas, mangaCategories });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getManga = async (req: express.Request, res: express.Response) => {
  const id = req.query.id as string;
  try {
    if (!id) {
      res.status(400).json({ error: "Manga ID is required" });
      return;
    }
    const manga = await prisma.manga.findFirst({
      where: { id },
      include: { author: true },
    });
    if (!manga) {
      res.status(404).json({ error: "Manga not found" });
      return;
    }

    const mangaCategories = await prisma.manga_Category.findMany({
      where: { mangaId: manga.id },
      include: { category: true },
    });

    res.status(200).json({ manga, mangaCategories });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create manga

export const createManga = async (
  req: express.Request,
  res: express.Response
) => {
  const { manga_name, manga_description, authorId, categoryIds, manga_image } =
    req.body;
  try {
    if (
      !manga_name ||
      !manga_description ||
      !authorId ||
      categoryIds.length < 1
    ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const authorExist = await prisma.author.findFirst({
      where: { id: authorId },
    });
    if (!authorExist) {
      res.status(400).json({ error: "Author not found" });
      return;
    }
    const categoryExist = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
    });
    if (categoryExist.length < categoryIds.length) {
      res.status(400).json({ error: "Category not found" });
      return;
    }
    const newManga = await prisma.manga.create({
      data: { manga_description, manga_image, manga_name, authorId },
      include: { author: true },
    });
    await prisma.$transaction(
      categoryIds.map((categoryId: string) =>
        prisma.manga_Category.create({
          data: { mangaId: newManga.id, categoryId },
        })
      )
    );
    const mangaCategories = await prisma.manga_Category.findMany({
      where: { mangaId: newManga.id },
      include: { category: true },
    });
    res.status(201).json({
      newManga,
      mangaCategories,
      message: `${newManga.manga_name} created successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update Manga
export const updateManga = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      id,
      manga_name,
      manga_image,
      manga_description,
      authorId,
      categoryIds,
    } = req.body;
    if (
      !id ||
      !manga_name ||
      !manga_image ||
      !manga_description ||
      !authorId ||
      categoryIds.length < 1
    ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const isExist = await prisma.manga.findFirst({ where: { id } });
    if (!isExist) {
      res.status(400).json({ error: "Manga not found" });
      return;
    }
    if (isExist.manga_image) {
      const publicId = isExist.manga_image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        console.log("Image deleted from Cloudinary:", publicId);
      }
    }
    const updatedManga = await prisma.manga.update({
      where: { id },
      data: { manga_name, manga_image, manga_description, authorId },
      include: { author: true },
    });
    const mangaCategories = await prisma.manga_Category.findMany({
      where: { mangaId: id },
    });

    const toRemove = mangaCategories.filter(
      (mangaCategory) => !categoryIds.includes(mangaCategory.categoryId)
    );
    if (toRemove.length) {
      await prisma.manga_Category.deleteMany({
        where: {
          mangaId: id,
          categoryId: { in: toRemove.map((item) => item.categoryId) },
        },
      });
    }
    const toAdd = categoryIds.filter(
      (categoryId: string) =>
        !mangaCategories.find((item) => item.categoryId === categoryId)
    );
    if (toAdd.length) {
      await prisma.$transaction(
        toAdd.map((categoryId: string) =>
          prisma.manga_Category.create({
            data: { mangaId: id, categoryId },
          })
        )
      );
    }

    const updatedMangaCategories = await prisma.manga_Category.findMany({
      where: { mangaId: id },
      include: { category: true },
    });
    res.status(200).json({
      updatedManga,
      updatedMangaCategories,
      message: `${updatedManga.manga_name} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete manga

export const deleteManga = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Manga ID is required" });
      return;
    }
    const isExist = await prisma.manga.findFirst({ where: { id } });
    if (!isExist) {
      res.status(400).json({ error: "Manga not found" });
      return;
    }
    if (isExist.manga_image) {
      const publicId = isExist.manga_image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        console.log("Image deleted from Cloudinary:", publicId);
      }
    }

    const deletedManga = await prisma.manga.delete({
      where: { id },
    });
    res.status(200).json({
      message: `${deletedManga.manga_name} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
