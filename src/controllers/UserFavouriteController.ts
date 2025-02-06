import express from "express";
import { prisma } from "../util/prisma";

export const toggleFavourite = async (
  req: express.Request,
  res: express.Response
) => {
  const { mangaId } = req.body;
  const { email } = req.body.user;

  try {
    if (!email || !mangaId) {
      res.status(400).json({ error: "Email and mangaId are required" });
      return;
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    const isExist = await prisma.favourite.findFirst({
      where: { mangaId, userId: user.id },
    });
    if (isExist) {
      await prisma.favourite.delete({ where: { id: isExist.id } });
      res
        .status(200)
        .json({ message: "Successfully removed", deletedFavourite: isExist });
      return;
    }
    const newFavourite = await prisma.favourite.create({
      data: {
        mangaId,
        userId: user.id,
      },
    });
    res.status(201).json({ newFavourite, message: "Successfully added" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFavouriteMangas = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body.user;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const favouriteMangas = await prisma.favourite.findMany({
      where: { userId: user.id },
      include: { manga: { include: { author: true } } },
    });

    res.status(200).json({ favouriteMangas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
