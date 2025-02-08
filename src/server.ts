import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import { verifyAdminToken, verifyUserToken } from "./util/verifyToken";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoutes";

import adminRoute from "./routes/adminRoutes";
import adminDataRoutes from "./routes/adminDataRoutes";
import AdminCategoryRoutes from "./routes/AdminCategoryRoute";
import AdminSeasonRoutes from "./routes/AdminSeasonRoute";
import AdminAuthorRoutes from "./routes/AdminAuthorRoute";
import AdminMangaRoutes from "./routes/AdminMangaRoute";
import AdminMangaSeasonRoutes from "./routes/AdminMangaSeasonRoute";
import AdminChapterRoutes from "./routes/AdminChapterRoute";
import AdminMangaSeasonChapterRoutes from "./routes/AdminMangaSeasonChapterRoute";
import AdminPageRoutes from "./routes/AdminPageRoute";
import UserCategoryRoutes from "./routes/UserCategoryRoute";
import UserMangaRoutes from "./routes/UserMangaRoute";
import UserChapterRoutes from "./routes/UserChapterController";
import UserPageRoutes from "./routes/UserPageRoute";
import UserRatingAndReviewRoutes from "./routes/UserRatingAndReviewRoute";
import AdminUserRoute from "./routes/AdminUserRoute";
import UserFavouriteRoute from "./routes/UserFavouriteRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ credentials: true, origin: "https://otaku-admin-one.vercel.app" })
);
// user
app.use("/api/user", userRoute);

// admin
app.use("/api/auth/admin", adminRoute);
app.use("/api/admin", verifyAdminToken, adminDataRoutes);
// admin category
app.use("/api/admin/category", verifyAdminToken, AdminCategoryRoutes);
// admin season
app.use("/api/admin/season", verifyAdminToken, AdminSeasonRoutes);
// admin author
app.use("/api/admin/author", verifyAdminToken, AdminAuthorRoutes);
// admin manga
app.use("/api/admin/manga", verifyAdminToken, AdminMangaRoutes);
// admin manga season
app.use("/api/admin/manga-season", verifyAdminToken, AdminMangaSeasonRoutes);
// admin chapter
app.use("/api/admin/chapter", verifyAdminToken, AdminChapterRoutes);
// admin manga season chapter
app.use(
  "/api/admin/manga-season-chapter",
  verifyAdminToken,
  AdminMangaSeasonChapterRoutes
);
// admin User
app.use("/api/admin/users", verifyAdminToken, AdminUserRoute);
// admin page
app.use("/api/admin/page", verifyAdminToken, AdminPageRoutes);

// user

// categories
app.use("/api/categories", UserCategoryRoutes);
// Mangas
app.use("/api/mangas", UserMangaRoutes);
// Chapters
app.use("/api/chapters", UserChapterRoutes);
// Pages
app.use("/api/pages", UserPageRoutes);
// rating and reviews
app.use("/api/rating-review", UserRatingAndReviewRoutes);
//favourite
app.use("/api/favourite", verifyUserToken, UserFavouriteRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
