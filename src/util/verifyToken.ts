import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUserToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token Expired! Please Login Again!" });
      return;
    }
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
export const verifyAdminToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET as string);

    req.body.admin = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token Expired" });
      return;
    }
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
