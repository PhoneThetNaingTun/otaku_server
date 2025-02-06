import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";
import { verifyUserToken } from "../util/verifyToken";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/getUser", verifyUserToken, getUser);
userRoute.patch("/update-user", verifyUserToken, updateUser);
export default userRoute;
