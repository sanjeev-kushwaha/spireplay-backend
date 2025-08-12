import express from "express";
import {
  getAllPlansController,
  getPlanByIdController,
  createPlanController,
  updatePlanController,
  deletePlanController
} from "../Controllers/SubscriptionPlanController.js";

const router = express.Router();

// GET all plans
router.get("/", getAllPlansController);

// GET plan by ID
router.get("/:id", getPlanByIdController);

// CREATE new plan
router.post("/", createPlanController);

// UPDATE a plan
router.put("/:id", updatePlanController);

// DELETE a plan (soft delete)
router.delete("/:id", deletePlanController);

export default router;
