import express from "express";
import { prisma } from "../util/prisma";

export const savePushToken = async (
  req: express.Request,
  res: express.Response
) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ error: "Token is required" });
    return;
  }

  await prisma.pushToken.upsert({
    where: { token },
    update: {},
    create: { token },
  });

  res.json({ message: "Token saved successfully" });
};
