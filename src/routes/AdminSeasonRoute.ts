import express from "express";
import {
  createSeason,
  deleteSeason,
  getSeason,
  getSeasons,
  updateSeason,
} from "../controllers/AdminSeasonController";

const AdminSeasonRoutes = express.Router();

AdminSeasonRoutes.get("/get-seasons", getSeasons);
AdminSeasonRoutes.get("/get-season", getSeason);
AdminSeasonRoutes.post("/create-season", createSeason);
AdminSeasonRoutes.patch("/update-season", updateSeason);
AdminSeasonRoutes.delete("/delete-season", deleteSeason);

export default AdminSeasonRoutes;
