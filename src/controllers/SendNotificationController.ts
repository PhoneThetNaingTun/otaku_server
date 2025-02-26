import express from "express";
import { prisma } from "../util/prisma";

export const sendNotification = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, message } = req.body;

  if (!title || !message) {
    res.status(400).json({ error: "Title and message are required" });
    return;
  }
  const users = await prisma.pushToken.findMany();
  const expoPushTokens = users.map((user) => user.token);

  const messages = expoPushTokens.map((token) => ({
    to: token,
    sound: "default",
    title: title,
    body: message,
  }));

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(messages),
  });

  res.json({ success: true, message: "Notification sent" });
};
