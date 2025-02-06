import express from "express";
import {
  createPage,
  deletePage,
  getPages,
} from "../controllers/AdminPagesController";

const AdminPageRoutes = express.Router();

AdminPageRoutes.get("/get-pages", getPages);
AdminPageRoutes.post("/create-page", createPage);
AdminPageRoutes.delete("/delete-page", deletePage);
export default AdminPageRoutes;
