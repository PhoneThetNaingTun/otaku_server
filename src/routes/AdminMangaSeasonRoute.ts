import express from "express";
import {
  createMangaSeason,
  deleteMangaSeason,
  getMangaSeasonsByManga,
} from "../controllers/AdminMangaSeasonController";

const AdminMangaSeasonRoutes = express.Router();

AdminMangaSeasonRoutes.get("/get-manga-seasons", getMangaSeasonsByManga);
AdminMangaSeasonRoutes.post("/create-manga-season", createMangaSeason);
AdminMangaSeasonRoutes.delete("/delete-manga-season", deleteMangaSeason);

export default AdminMangaSeasonRoutes;
