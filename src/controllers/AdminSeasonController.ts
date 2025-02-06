import express from "express";
import { prisma } from "../util/prisma";

export const getSeasons = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const seasons = await prisma.season.findMany();
    res.status(200).json({ seasons });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// getOneSeason
export const getSeason = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.query.id as string;
  try {
    if (!id) {
      res.status(400).json({ error: "Season ID is required" });
      return;
    }
    const season = await prisma.season.findFirst({
      where: { id },
    });
    if (!season) {
      res.status(404).json({ error: "Season not found" });
      return;
    }
    res.status(200).json({ season });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSeason = async (
  req: express.Request,
  res: express.Response
) => {
  const { season } = req.body;
  try {
    if (!season) {
      res.status(400).json({ error: "Season is required" });
      return;
    }
    const newSeason = await prisma.season.create({
      data: {
        season,
      },
    });
    res.status(200).json({ newSeason, message: "Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSeason = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, season } = req.body;
  try {
    if (!id || !season) {
      res.status(400).json({ error: "Season ID and season are required" });
      return;
    }
    const existingSeason = await prisma.season.findFirst({
      where: { id },
    });
    if (!existingSeason) {
      res.status(404).json({ error: "Season not found" });
      return;
    }
    const updatedSeason = await prisma.season.update({
      where: { id },
      data: {
        season,
      },
    });
    res.status(200).json({
      updatedSeason,
      message: `'${existingSeason.season}' updated to '${updatedSeason.season}' Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSeason = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.body;
  try {
    if (!id) {
      res.status(400).json({ error: "Season ID is required" });
      return;
    }
    await prisma.season.delete({
      where: { id },
    });
    res.status(200).json({ message: "Season deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
