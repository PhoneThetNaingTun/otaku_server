import express from "express";
import { prisma } from "../util/prisma";

export const getLandingPageData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const latestUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    const totalMangas = await prisma.manga.count();
    const totalUsers = await prisma.user.count();
    res.status(200).json({ latestUsers, totalMangas, totalUsers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
