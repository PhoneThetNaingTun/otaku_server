import express from "express";
import { prisma } from "../util/prisma";

export const createCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const { category_name } = req.body;
  try {
    if (!category_name) {
      res.status(400).json({ error: "Category name is required" });
      return;
    }
    const newCategory = await prisma.category.create({
      data: { category_name },
    });
    res
      .status(201)
      .json({ newCategory, message: "Category created successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, category_name } = req.body;
  try {
    if (!id || !category_name) {
      res.status(400).json({ error: "Category ID and name are required" });
      return;
    }
    const existingCategory = await prisma.category.findFirst({
      where: { id },
    });
    if (!existingCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { category_name },
    });
    res
      .status(200)
      .json({
        updatedCategory,
        message: `'${existingCategory.category_name}' updated to '${updatedCategory.category_name}' Successfully!`,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.body;
  try {
    if (!id) {
      res.status(400).json({ error: "Category ID is required" });
      return;
    }
    await prisma.category.delete({
      where: { id },
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.query.id as string;
  try {
    if (!id) {
      res.status(400).json({ error: "Category ID is required" });
      return;
    }
    const category = await prisma.category.findFirst({
      where: { id },
    });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
