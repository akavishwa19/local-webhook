import express from "express";
import {
  makeRecipe,
  fetchAllWebhooks,
  clearAll
} from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/make-recipe", makeRecipe);
router.get("/webhooks", fetchAllWebhooks);
router.delete("/webhooks", clearAll);

export default router;
