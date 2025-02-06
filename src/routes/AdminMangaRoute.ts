import express from "express";
import {
  createManga,
  deleteManga,
  getManga,
  getMangas,
  updateManga,
} from "../controllers/AdminMangaController";

const AdminMangaRoutes = express.Router();

AdminMangaRoutes.get("/get-mangas", getMangas);
AdminMangaRoutes.get("/get-manga", getManga);
AdminMangaRoutes.post("/create-manga", createManga);
AdminMangaRoutes.patch("/update-manga", updateManga);
AdminMangaRoutes.delete("/delete-manga", deleteManga);

export default AdminMangaRoutes;
