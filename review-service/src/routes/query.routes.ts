import getGigReviews from "@src/controllers/gig-reviews.controller";
import getSellerReviews from "@src/controllers/seller-reviews.controller";
import { Router, type Request, type Response } from "express";

const queryRouter: Router = Router();

queryRouter.get("/gig/:gigId", getGigReviews);
queryRouter.get("/seller/:sellerId", getSellerReviews);

export default queryRouter;
