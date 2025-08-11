import mongoose from "mongoose";

const SubscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  validity: { type: String, required: true }, // in days
  deviceCount: { type: String, required: true },
  videoQuality: { type: String, required: true }, // e.g., "SD", "HD", "4K"
  resolution: { type: String, required: true }, // e.g., "720p", "1080p", "4K"
  supportedDevices: { type: [String], required: true }, // e.g., ["Web", "Android", "iOS"]
  downloadedDevice: { type: String }, // e.g., ["Web", "Android", "iOS"]
  description: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

const SubscriptionPlanModel = mongoose.model(
  "SubscriptionPlan",
  SubscriptionPlanSchema
);
export default SubscriptionPlanModel;
