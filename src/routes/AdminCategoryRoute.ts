import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/AdminCategoryController";

const AdminCategoryRoutes = express.Router();

AdminCategoryRoutes.post("/create-category", createCategory);
AdminCategoryRoutes.patch("/update-category", updateCategory);
AdminCategoryRoutes.delete("/delete-category", deleteCategory);
AdminCategoryRoutes.get("/get-categories", getCategories);
AdminCategoryRoutes.get("/get-category", getCategory);

export default AdminCategoryRoutes;
