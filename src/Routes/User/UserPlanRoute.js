import express from "express";
import * as UserPlanController from "../../Controllers/User/UserPlanController.js";

const router = express.Router();

router.get("/plan/:id", UserPlanController.getUserPlan);
router.post("/plan/subscribe", UserPlanController.subscribePlan);
// router.put("/update/:id", UserPlanController.updateUserPlan);
// router.delete("/delete/:id", UserPlanController.deleteUserPlan);
export default router;