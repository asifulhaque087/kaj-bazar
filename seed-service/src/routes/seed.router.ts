import seedDB from "@src/controllers/seed-db.controller";
import { Router } from "express";

const seedRouter = Router();

// ** Register
seedRouter.post("/db", seedDB);

export default seedRouter;
