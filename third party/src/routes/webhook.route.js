import express from "express";
import {
  makeRecipe,
  fetchAllWebhooks,
  fetchSingleWebhook,
} from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/make-recipe", makeRecipe);
router.get("/webhooks", fetchAllWebhooks);
router.post("/webhook", fetchSingleWebhook);

export default router;
