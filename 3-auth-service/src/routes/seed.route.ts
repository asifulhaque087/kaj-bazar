// ** Third party imports
import seedAuth from "@src/controllers/seed-auth.controller";
import { Router } from "express";

const seedRouter = Router();

seedRouter.put("/seed/:count", seedAuth);

export default seedRouter;
