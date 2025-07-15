import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/gateway-health", (_, res) => {
  res.send("Gateway server is running");
});

export default healthRouter;

// import { Router, type Request, type Response } from "express";

// const healthRouter = Router();

// healthRouter.get("/gateway-health", (req: Request, res: Response) => {
//   return c.text("Gateway server is running");
// });

// export default healthRouter;
