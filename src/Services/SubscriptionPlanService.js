import SubscriptionPlan from "../Models/SubscriptionPlanModel.js";
import mongoose from "mongoose";

export const getPlans = async () => {
  try {
    return await SubscriptionPlan.find({ deleted: false });
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error("Internal server error" + error.message);
  }
};

export const getPlanById = async (planId) => {
  try {
    if (!mongoose.isValidObjectId(planId)) {
      throw new Error("Invalid Plan ID");
    }
    return await SubscriptionPlan.findOne({ _id: planId, deleted: false });
  } catch (error) {
    console.error("Error fetching single plan:", error);
    throw new Error("Internal server error");
  }
};

export const createPlan = async (requestedData) => {
  try {
    const newPlan = new SubscriptionPlan(requestedData);
    return await newPlan.save();
  } catch (error) {
    console.error("Error in createPlan:", error.message);
    throw new Error(`Internal server error: ${error.message}`);
  }
};

export const updatePlanService = async (planId, updateData) => {
  if (!mongoose.isValidObjectId(planId)) {
    throw new Error("Invalid Plan ID");
  }
  if (!updateData || Object.keys(updateData).length === 0) {
    throw new Error("No data provided for update");
  }

  const updatedPlan = await SubscriptionPlan.findOneAndUpdate(
    { _id: planId, deleted: false },
    { $set: updateData },
    { new: true }
  );

  if (!updatedPlan) {
    throw new Error("Plan not found");
  }

  return updatedPlan;
};

export const deletePlanService = async (planId) => {
  if (!mongoose.isValidObjectId(planId)) {
    throw new Error("Invalid Plan ID");
  }

  const updated = await SubscriptionPlan.findOneAndUpdate(
    { _id: planId, deleted: false },
    { $set: { deleted: true } },
    { new: true }
  );

  if (!updated) throw new Error("Plan not found");

  return updated;
};
