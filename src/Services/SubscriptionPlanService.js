import SubscriptionPlan from "../Models/SubscriptionPlanModel.js";

export const getPlans = async (req, res) => {
  try {
    const plansData = await SubscriptionPlan.find({ deleted: false });
    return plansData;
  } catch (error) {
    console.error("Error Fetching plans : ", error);
    throw new Error("Internal server error");
  }
};

export const getPlanById = async (planId) => {
  try {
    const planData = await SubscriptionPlan.findOne(
      { _id: planId },
      { deleted: false }
    );
    return planData;
  } catch (error) {
    console.error("Error fetching single plan : ", error);
    throw new Error("Internal server error");
  }
};

export const createPlan = async (requestedData) => {
  try {
    const newPlan = new SubscriptionPlan(requestedData);
    return await newPlan.save();
  } catch (error) {
    console.error("Error in createPlan:", error.message);
    throw new Error("Internal server error", error.message);
  }
};

export const updatePlanService = async (planId, updateData) => {
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
  if (!planId) throw new Error("Plan ID is required");

  const updated = await SubscriptionPlan.findOneAndUpdate(
    { _id: planId, deleted: false },
    { $set: { deleted: true } },
    { new: true }
  );

  if (!updated) throw new Error("Plan not found");

  return updated;
};
