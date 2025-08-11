import * as SubscriptionPlanService from "../../Services/SubscriptionPlanService.js";

export const getAllPlans = async (req, res, next) => {
  try {
    const plans = await SubscriptionPlanService.getPlans();

    return res.status(200).json({
      success: true,
      message:
        plans.length > 0 ? "Plans fetched successfully" : "No plans found",
      data: plans,
    });
  } catch (error) {
    console.error("Get All Plans Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSinglePlan = async (req, res, next) => {
  try {
    const planId = req.params.id;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "Plan ID is required",
      });
    }

    const planData = await SubscriptionPlanService.getPlanById(planId);

    if (!planData) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Plan fetched successfully",
      data: planData,
    });
  } catch (error) {
    console.error("Error in getSinglePlan:", error);

    // Optionally forward to centralized error middleware
    // return next(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addPlan = async (req, res) => {
  try {
    const {
      name,
      price,
      validity,
      description,
      deviceCount,
      videoQuality,
      resolution,
      supportedDevices,
      downloadedDevices,
    } = req.body;

    const requestedData = {
      name,
      price,
      validity,
      description,
      deviceCount,
      videoQuality,
      resolution,
      supportedDevices,
      downloadedDevices,
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

    const newPlan = await SubscriptionPlanService.createPlan(requestedData);

    return res.status(201).json({
      success: true,
      message: "Subscription plan created successfully",
      data: newPlan,
    });
  } catch (error) {
    console.error("Add Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// export const createSubscriptionPlan = async (req, res, next) => {
//   try {
//     const plan = await createPlan(req.body);
//     return res.status(201).json({
//       success: true,
//       message: "Subscription plan created successfully",
//       data: plan,
//     });
//   } catch (error) {
//     console.error("Create Plan Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

export const updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;
    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "Plan ID is required",
      });
    }
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }
    const updatedPlan = await SubscriptionPlanService.updatePlanService(
      planId,
      updateData
    );
    return res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: updatedPlan,
    });
  } catch (error) {
    console.error("Update Plan Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const planId = req.params.id;
    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "Plan ID is required",
      });
    }

    const deletedPlan = await SubscriptionPlanService.deletePlanService(planId);
    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
      data: deletedPlan,
    });
  } catch (error) {
    console.error("Delete Plan Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
