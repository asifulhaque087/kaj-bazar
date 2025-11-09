import startSeed from "@src/controllers/start-seed.controller";
import { Router } from "express";

const seedRouter = Router();

// ** Register
seedRouter.post("/signup", startSeed);

export default seedRouter;
