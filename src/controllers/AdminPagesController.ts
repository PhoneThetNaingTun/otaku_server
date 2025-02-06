import express from "express";
import { prisma } from "../util/prisma";
import cloudinary from "../config/cloudinary";

export const getPages = async (req: express.Request, res: express.Response) => {
  try {
    const mangaSeasonChapterId = req.query.mangaSeasonChapterId as string;
    const pages = await prisma.page.findMany({
      where: { mangaSeasonChapterId },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json({ pages });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { imgUrl, mangaSeasonChapterId } = req.body;
    if (!imgUrl || !mangaSeasonChapterId) {
      res
        .status(400)
        .json({ error: "ImgUrl and mangaSeasonChapterId are required" });
      return;
    }
    const newPage = await prisma.page.create({
      data: { imgUrl, mangaSeasonChapterId },
    });
    res.status(200).json({ newPage, message: "Page created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Page ID is required" });
      return;
    }
    const page = await prisma.page.findFirst({
      where: { id },
    });
    if (!page) {
      res.status(404).json({ error: "Page not found" });
      return;
    }
    if (page.imgUrl) {
      const publicId = page.imgUrl.split("/").slice(-2).join("/").split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        console.log("Image deleted from Cloudinary:", publicId);
      }
    }
    await prisma.page.delete({
      where: { id },
    });
    res.status(200).json({ message: "Page deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
