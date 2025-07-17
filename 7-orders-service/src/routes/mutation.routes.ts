import { Router, type Request, type Response } from "express";

const mutationRouter = Router();

mutationRouter.post(
  "/",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from Create an order" });
  }
);
mutationRouter.post(
  "/create-payment-intent",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from Create payment intent" });
  }
);
mutationRouter.put(
  "/cancel/:orderId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from cancel an order" });
  }
);
mutationRouter.put(
  "/extension/:orderId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am extension of an orderjlk" });
  }
);
mutationRouter.put(
  "/deliver-order/:orderId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am delivery an order" });
  }
);
mutationRouter.put(
  "/approve-order/:orderId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am approve an order" });
  }
);
mutationRouter.put(
  "/gig/:type/:orderId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am gig related order" });
  }
);
mutationRouter.put(
  "/notification/mark-as-read",

  (req: Request, res: Response) => {
    return res.json({ m: "I am mark notification as read" });
  }
);

export default mutationRouter;
