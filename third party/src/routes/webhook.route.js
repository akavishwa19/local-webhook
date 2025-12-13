import express from "express";
import {
  makeRecipe,
} from "../controllers/webhook.controller.js";


const router = express.Router();

router.post("/make-recipe",makeRecipe);

export default router;
