import express from "express";
import {
  createChapter,
  deleteChapter,
  getChapter,
  getChapters,
  updateChapter,
} from "../controllers/AdminChapterController";

const AdminChapterRoutes = express.Router();
AdminChapterRoutes.get("/get-chapters", getChapters);
AdminChapterRoutes.get("/get-chapter", getChapter);
AdminChapterRoutes.post("/create-chapter", createChapter);
AdminChapterRoutes.patch("/update-chapter", updateChapter);
AdminChapterRoutes.delete("/delete-chapter", deleteChapter);

export default AdminChapterRoutes;
