import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "../controllers/AdminAuthorController";

const AdminAuthorRoutes = express.Router();

AdminAuthorRoutes.get("/get-authors", getAuthors);
AdminAuthorRoutes.get("/get-author", getAuthor);
AdminAuthorRoutes.post("/create-author", createAuthor);
AdminAuthorRoutes.patch("/update-author", updateAuthor);
AdminAuthorRoutes.delete("/delete-author", deleteAuthor);

export default AdminAuthorRoutes;
