import { config } from "@src/config";
import buyerReviewSeller from "@src/controllers/reviews/buyer-review-seller.controller";
import getGigReviews from "@src/controllers/reviews/gig-reviews.controller";
import sellerReviewBuyer from "@src/controllers/reviews/seller-review-buyer.controller";
import getSellerReviews from "@src/controllers/reviews/seller-reviews.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import { Router } from "express";

const reviewRouter = Router();

reviewRouter.use(
  apiMiddleware(`${config.REVIEW_BASE_URL}/api/v1/reviews`, "reviews")
);

reviewRouter.post("/buyer-review-seller", verifyJwtToken, buyerReviewSeller);
reviewRouter.post("/seller-review-buyer", verifyJwtToken, sellerReviewBuyer);
reviewRouter.get("/gig/:gigId", getGigReviews);
reviewRouter.get("/seller/:sellerId", getSellerReviews);

export default reviewRouter;
