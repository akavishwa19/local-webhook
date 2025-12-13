import express from "express";
import {
  makeRecipe,
  fetchAllWebhooks,
} from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/make-recipe", makeRecipe);
router.get("/webhooks", fetchAllWebhooks);

export default router;
