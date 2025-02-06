import express from "express";
import { prisma } from "../util/prisma";

export const getChapters = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const chapters = await prisma.chapter.findMany();
    res.status(200).json({ chapters });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChapter = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.query.id as string;
  try {
    if (!id) {
      res.status(400).json({ error: "Chapter ID is required" });
      return;
    }
    const chapter = await prisma.chapter.findFirst({
      where: { id },
    });
    if (!chapter) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }
    res.status(200).json({ chapter });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createChapter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { chapter } = req.body;
    if (!chapter) {
      res.status(400).json({ error: "Chapter number is required" });
      return;
    }
    const newChapter = await prisma.chapter.create({ data: { chapter } });

    res.status(200).json({
      newChapter,
      message: `Chapter ${newChapter.chapter} created successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateChapter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, chapter } = req.body;
    if (!id || !chapter) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const chapterExist = await prisma.chapter.findFirst({
      where: { id },
    });
    if (!chapterExist) {
      res.status(400).json({ error: "Chapter not found" });
      return;
    }
    const updatedChapter = await prisma.chapter.update({
      where: { id },
      data: { chapter },
    });
    res.status(200).json({
      updatedChapter,
      message: `${chapterExist.chapter} updated to ${updatedChapter.chapter}  successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteChapter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Chapter ID is required" });
      return;
    }
    const chapterExist = await prisma.chapter.findFirst({
      where: { id },
    });
    if (!chapterExist) {
      res.status(400).json({ error: "Chapter not found" });
      return;
    }
    const deletedChapter = await prisma.chapter.delete({
      where: { id },
    });
    res.status(200).json({
      deletedChapter,
      message: `${deletedChapter.chapter} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
