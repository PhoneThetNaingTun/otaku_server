import express from "express";
import {
  createRatingAndReview,
  deleteRatingAndReview,
  getRatingAndReviewByMangaId,
  getRatingAndReviewByUserId,
} from "../controllers/UserRatingAndReviewController";
import { verifyUserToken } from "../util/verifyToken";

const UserRatingAndReviewRoutes = express.Router();

UserRatingAndReviewRoutes.post(
  "/create-rating-and-review",
  verifyUserToken,
  createRatingAndReview
);
UserRatingAndReviewRoutes.get(
  "/get-rating-and-review-by-manga",
  getRatingAndReviewByMangaId
);
UserRatingAndReviewRoutes.delete(
  "/delete-rating-and-review",
  verifyUserToken,
  deleteRatingAndReview
);
UserRatingAndReviewRoutes.get(
  "/get-rating-and-review-by-user",
  verifyUserToken,
  getRatingAndReviewByUserId
);

export default UserRatingAndReviewRoutes;
