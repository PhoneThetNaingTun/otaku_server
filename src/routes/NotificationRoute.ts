import express from "express";
import { savePushToken } from "../controllers/SavePushTokenController";
import { sendNotification } from "../controllers/SendNotificationController";
import { verifyAdminToken, verifyUserToken } from "../util/verifyToken";

const NotificationRoute = express.Router();

NotificationRoute.post("/save-token", savePushToken);
NotificationRoute.post(
  "/send-notification",
  verifyAdminToken,
  sendNotification
);

export default NotificationRoute;
