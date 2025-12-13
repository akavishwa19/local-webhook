import express from "express";
import {
  startCooking,
  webhookListener,
} from "../controllers/webhook.controller.js";


const router = express.Router();

router.post("/start-cooking",startCooking);
router.post("/webhook/recipe",webhookListener);

export default router;
