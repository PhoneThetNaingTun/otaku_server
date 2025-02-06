import express from "express";
import argon2 from "argon2";
import { prisma } from "../util/prisma";
import jwt from "jsonwebtoken";
import { validateEmail } from "../util/valitateEmail";
export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const emailCorrect = await validateEmail(email);
    if (!emailCorrect) {
      res.status(400).json({ error: "Email is not valid" });
      return;
    }
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const hashPassowrd = await argon2.hash(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashPassowrd },
    });
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ message: "User registered successfully", token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const emailCorrect = await validateEmail(email);
    if (!emailCorrect) {
      res.status(400).json({ error: "Email is not valid" });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "Email does not exist" });
      return;
    }
    const passwordCorrect = await argon2.verify(user.password, password);
    if (!passwordCorrect) {
      res.status(400).json({ error: "Password is incorrect" });
      return;
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body.user;
    if (!email) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { email },
      select: { name: true, email: true, gender: true },
    });
    if (!user) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    const { email } = req.body.user;
    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { name: name },
      select: { name: true, email: true },
    });
    res
      .status(200)
      .json({ message: "User Updated  Successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
