import express from "express";
import { prisma } from "../util/prisma";

export const getRatingAndReviewByMangaId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mangaId = req.query.mangaId as string;
    if (!mangaId) {
      res.status(400).json({ error: "Manga ID is required" });
      return;
    }
    const ratingAndReviews = await prisma.rating_Review.findMany({
      where: { mangaId },
      include: { user: true },
    });

    res.status(200).json({ ratingAndReviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRatingAndReview = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    const { email } = req.body.user;
    if (!id) {
      res.status(400).json({ error: "Rating and review ID is required" });
      return;
    }
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const ratingAndReview = await prisma.rating_Review.findFirst({
      where: { id, userId: user.id },
    });
    if (!ratingAndReview) {
      res.status(404).json({ error: "Rating and review not found" });
      return;
    }
    await prisma.rating_Review.delete({
      where: { id },
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRatingAndReviewByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body.user;

    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const ratingAndReviews = await prisma.rating_Review.findMany({
      where: { userId: user.id },
      include: { manga: true, user: true },
    });
    res.status(200).json({ ratingAndReviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createRatingAndReview = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { mangaId, rating, review } = req.body;
    const { email } = req.body.user;
    if (!mangaId) {
      res.status(400).json({ error: "Manga ID is required" });
      return;
    }
    if (!email) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    if (!rating && !review) {
      res.status(400).json({ error: "Rating or review are required" });
      return;
    }
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const isExist = await prisma.rating_Review.findFirst({
      where: { mangaId, userId: user.id },
    });
    if (isExist) {
      res.status(400).json({ error: "You have already rated this manga" });
      return;
    }

    const newRatingAndReview = await prisma.rating_Review.create({
      data: { userId: user.id, mangaId, rating, review },
    });
    res.status(201).json({
      newRatingAndReview,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
