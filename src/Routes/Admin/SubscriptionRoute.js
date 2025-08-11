import express from "express";
import * as SubscriptionController from "../../Controllers/Admin/SubscriptionPlanController.js";

const router = express.Router();

router.get("/plans", SubscriptionController.getAllPlans);

router.get("/plans/:id", SubscriptionController.getSinglePlan);

router.post("/plans", SubscriptionController.addPlan);

router.put("/plans/:id", SubscriptionController.updatePlan);

router.delete("/plans/:id", SubscriptionController.deletePlan);

export default router;
