import express from "express";
import { getCategories } from "../controllers/UserCategoryController";

const UserCategoryRoutes = express.Router();

UserCategoryRoutes.get("/get-categories", getCategories);


export default UserCategoryRoutes;
