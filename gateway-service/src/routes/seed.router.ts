import { config } from "@src/config";
import buyerReviewSeller from "@src/controllers/reviews/buyer-review-seller.controller";
import seedDB from "@src/controllers/seed/seed-db.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { Router } from "express";

const seedRouter = Router();

seedRouter.use(apiMiddleware(`${config.SEED_BASE_URL}/api/v1/seeds`, "seed"));

seedRouter.post("/db", seedDB);

export default seedRouter;
