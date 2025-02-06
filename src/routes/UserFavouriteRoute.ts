import express from "express";
import {
  toggleFavourite,
  getFavouriteMangas,
} from "../controllers/UserFavouriteController";

const UserFavouriteRoute = express.Router();

UserFavouriteRoute.get("/get-favorite-mangas", getFavouriteMangas);
UserFavouriteRoute.post("/add-favourite", toggleFavourite);

export default UserFavouriteRoute;
