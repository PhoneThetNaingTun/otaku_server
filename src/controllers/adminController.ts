import express from "express";
import { validateEmail } from "../util/valitateEmail";
import { prisma } from "../util/prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const adminLogin = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const emailCorrect = validateEmail(email);
    if (!emailCorrect) {
      res.status(400).json({ error: "Email is not valid" });
      return;
    }
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      res.status(400).json({ error: "Email does not exist" });
      return;
    }
    const passwordMatch = await argon2.verify(admin.password, password);
    if (!passwordMatch) {
      res.status(400).json({ error: "Password is incorrect" });
      return;
    }

    const token = jwt.sign(
      { email: admin.email },
      process.env.JWT_ADMIN_SECRET as string,
      { expiresIn: "1d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production"
            ? ".otaku-admin-one.vercel.app"
            : "localhost",
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "Login successful",
        admin: { name: admin.name, email: admin.email },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const adminRegister = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const hashpass = await argon2.hash(password);
    await prisma.admin.create({
      data: { name, email, password: hashpass },
    });
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAdmin = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body.admin;
    if (!email) {
      res.status(400).json({ error: "Admin ID is required" });
      return;
    }
    const admin = await prisma.admin.findUnique({
      where: { email },
      select: { name: true, email: true },
    });
    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }
    res.status(200).json({ admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
