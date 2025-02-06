import express from "express";
import { prisma } from "../util/prisma";

// All Authors
export const getAuthors = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const authors = await prisma.author.findMany();
    res.status(200).json({ authors });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get One Author
export const getAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.query.id as string;
  try {
    if (!id) {
      res.status(400).json({ error: "Author ID is required" });
      return;
    }
    const author = await prisma.author.findFirst({
      where: { id },
    });
    if (!author) {
      res.status(404).json({ error: "Author not found" });
      return;
    }
    res.status(200).json({ author });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create Author

export const createAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  const { author_name } = req.body;
  try {
    if (!author_name) {
      res.status(400).json({ error: "Author name is required" });
      return;
    }
    const newAuthor = await prisma.author.create({
      data: { author_name },
    });
    res.status(201).json({ newAuthor, message: "Author created successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Update Author
export const updateAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, author_name } = req.body;
  try {
    if (!id || !author_name) {
      res.status(400).json({ error: "Author ID and name are required" });
      return;
    }
    const existingAuthor = await prisma.author.findFirst({
      where: { id },
    });
    if (!existingAuthor) {
      res.status(404).json({ error: "Author not found" });
      return;
    }
    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: { author_name },
    });
    res.status(200).json({
      updatedAuthor,
      message: `'${existingAuthor.author_name}' updated to '${updatedAuthor.author_name}' Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete author
export const deleteAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.body;
  try {
    if (!id) {
      res.status(400).json({ error: "Author ID is required" });
      return;
    }
    const existingAuthor = await prisma.author.findFirst({
      where: { id },
    });
    if (!existingAuthor) {
      res.status(404).json({ error: "Author not found" });
      return;
    }
    const deletedAuthor = await prisma.author.delete({
      where: { id },
    });
    res.status(200).json({
      message: `'${existingAuthor.author_name}' deleted Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
