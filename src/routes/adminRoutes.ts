import express from "express";
import { adminLogin, adminRegister } from "../controllers/adminController";

const AdminRoute = express.Router();

AdminRoute.post("/login", adminLogin);
AdminRoute.post("/register", adminRegister);
export default AdminRoute;
