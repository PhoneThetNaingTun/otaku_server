import express from "express";
import { getChapterByMangaSeasonId } from "../controllers/UserChapterController";

const UserChapterRoutes = express.Router();

UserChapterRoutes.get("/get-chapters", getChapterByMangaSeasonId);

export default UserChapterRoutes;
