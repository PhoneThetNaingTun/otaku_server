import express from "express";
import { getPagesByMangaSeasonChapterId } from "../controllers/UsetPageController";

const UserPageRoutes = express.Router();

UserPageRoutes.get("/get-pages", getPagesByMangaSeasonChapterId);

export default UserPageRoutes;
