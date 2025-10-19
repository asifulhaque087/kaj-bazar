import express, { Express } from "express";
import { start } from "@src/server";

function initialize(): void {
  const app: Express = express();
  start(app);
  console.log("Notification Service Initialized");
}
initialize();
