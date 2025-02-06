import express from "express";
import { prisma } from "../util/prisma";

export const getCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
  }
};
