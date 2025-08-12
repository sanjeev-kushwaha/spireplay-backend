import * as subscriptionService from "../Services/SubscriptionPlanService.js";

export const getAllPlansController = async (req, res, next) => {
  try {
    const plans = await subscriptionService.getPlans();
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
};

export const getPlanByIdController = async (req, res, next) => {
  try {
    const plan = await subscriptionService.getPlanById(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

export const createPlanController = async (req, res, next) => {
  try {
    const newPlan = await subscriptionService.createPlan(req.body);
    res.status(201).json({ success: true, data: newPlan });
  } catch (error) {
    next(error);
  }
};

export const updatePlanController = async (req, res, next) => {
  try {
    const updatedPlan = await subscriptionService.updatePlanService(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedPlan });
  } catch (error) {
    next(error);
  }
};

export const deletePlanController = async (req, res, next) => {
  try {
    const deletedPlan = await subscriptionService.deletePlanService(req.params.id);
    res.status(200).json({ success: true, data: deletedPlan });
  } catch (error) {
    next(error);
  }
};
