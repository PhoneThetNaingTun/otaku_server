import express from "express";
import {
  createMangaSeasonChapter,
  deleteMangaSeasonChapter,
  getMangaSeasonChapters,
} from "../controllers/MangaSeasonChapterController";

const AdminMangaSeasonChapterRoutes = express.Router();

AdminMangaSeasonChapterRoutes.get(
  "/get-manga-season-chapters",
  getMangaSeasonChapters
);
AdminMangaSeasonChapterRoutes.post(
  "/create-manga-season-chapter",
  createMangaSeasonChapter
);
AdminMangaSeasonChapterRoutes.delete(
  "/delete-manga-season-chapter",
  deleteMangaSeasonChapter
);

export default AdminMangaSeasonChapterRoutes;
