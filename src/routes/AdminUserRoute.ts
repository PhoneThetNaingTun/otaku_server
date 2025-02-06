import express from "express";
import { getLandingPageData } from "../controllers/AdminUserController";

const AdminUserRoute = express.Router();

AdminUserRoute.get("/latest-users", getLandingPageData);

export default AdminUserRoute;
