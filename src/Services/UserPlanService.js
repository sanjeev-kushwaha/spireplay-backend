import UserPlan from "../Models/UserPlanModel.js";
import UserModel from "../Models/UserModel.js";
import SubscriptionPlanModel from "../Models/SubscriptionPlanModel.js";

export const getUserPlan = async (userId) => {
  try {
    const userPlanData = await UserPlan.findOne({ userId, deleted: false });
    return userPlanData;
  } catch (error) {
    console.error("Error fetching user plan: ", error);
    throw new Error("Internal server error");
  }
};

export const createUserPlan = async (planData) => {
  try {
    const PlanData = await SubscriptionPlanModel.findOne({
      _id: planData.planId,
      deleted: false,
    });

    if (!PlanData) {
      throw new Error("Subscription plan not found or has been deleted");
    }

    const startDate = new Date();
    const endDate = new Date(startDate); // Clone

    // ✅ Handle validity using calendar logic
    if (planData.validity === "30 Days") {
      endDate.setMonth(endDate.getMonth() + 1); // 1 calendar month
    } else if (planData.validity === "90 Days") {
      endDate.setMonth(endDate.getMonth() + 3); // 3 months
    } else if (planData.validity === "180 Days") {
      endDate.setMonth(endDate.getMonth() + 6); // 6 months
    } else {
      endDate.setMonth(endDate.getMonth() + 1); // Default 1 month
    }

    const userPlanData = {
      userId: planData.userId,
      planId: planData.planId,
      startDate,
      endDate,
      status: "active",
    };

    const newUserPlan = new UserPlan(userPlanData);
    const userData = await UserModel.findOneAndUpdate(
      { _id: planData.userId, deleted: false },
      { $set: { userPlans: newUserPlan._id } },
      { new: true }
    );

    return await newUserPlan.save();
  } catch (error) {
    console.error("Error creating user plan: ", error);
    throw new Error("Internal server error");
  }
};
