import { validateData } from "@fvoid/shared-lib";
import buyerReviewSeller from "@src/controllers/buyer-review-seller.controller";
import sellerReviewBuyer from "@src/controllers/seller-review-buyer.controller";
import {
  buyerReviewSellerSchema,
  sellerReviewBuyerSchema,
} from "@src/validations/review.validation";
import { Router } from "express";

const mutationRouter = Router();

mutationRouter.post(
  "/buyer-review-seller",
  validateData(buyerReviewSellerSchema),
  buyerReviewSeller
);

mutationRouter.post(
  "/seller-review-buyer",
  validateData(sellerReviewBuyerSchema),
  sellerReviewBuyer
);

// mutationRouter.post(
//   "/",

//   (req: Request, res: Response) => {
//     return res.json({ m: "I am from create review" });
//   }
// );

export default mutationRouter;
