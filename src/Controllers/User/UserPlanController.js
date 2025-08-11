import * as userPlanService from "../../Services/UserPlanService.js";

export const getUserPlan = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming user ID is passed as a URL parameter
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const userPlanData = await userPlanService.getUserPlan(userId);
    if (!userPlanData) {
      return res.status(404).json({
        success: false,
        message: "User plan not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User plan fetched successfully",
      data: userPlanData,
    });
  } catch (error) {
    console.error("Error fetching user plan:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const subscribePlan = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const requestedData = {
      userId,
      planId,
    };

    for (const [key, value] of Object.entries(requestedData)) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        return res.status(400).json({
          success: false,
          message: `The field '${key}' is required.`,
        });
      }
    }
    const newUserPlan = await userPlanService.createUserPlan(requestedData);
    return res.status(201).json({
      success: true,
      message: "Subscription plan subscribed successfully",
      data: newUserPlan,
    });
  } catch (error) {
    console.error("Error subscribing to plan:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
