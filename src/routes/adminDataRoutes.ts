import express from "express";
import { getAdmin } from "../controllers/adminController";

const adminDataRoutes = express.Router();

adminDataRoutes.get("/getAdmin", getAdmin);

export default adminDataRoutes;
