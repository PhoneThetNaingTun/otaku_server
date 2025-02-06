import express from "express";
import {
  getLatestMangas,
  getMangaByCategory,
  getMangaById,
  getMangaByPage,
  getMangas,
  getMostRatedMangas,
} from "../controllers/UserMangaController";
import { getMangaBySearch } from "../controllers/UserSearchManga";

const UserMangaRoutes = express.Router();

UserMangaRoutes.get("/get-mangas", getMangas);
UserMangaRoutes.get("/get-manga", getMangaById);
UserMangaRoutes.get("/get-latest-mangas", getLatestMangas);
UserMangaRoutes.get("/get-most-rated-mangas", getMostRatedMangas);
UserMangaRoutes.get("/get-manga-by-category", getMangaByCategory);
UserMangaRoutes.get("/get-all-mangas", getMangaByPage);
UserMangaRoutes.get("/get-mangas-by-search", getMangaBySearch);

export default UserMangaRoutes;
