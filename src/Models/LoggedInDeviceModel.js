import mongoose from "mongoose";

const loggedInDeviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  deviceData: [
    {
      deviceId: { type: String, required: true },
      name: { type: String, required: true },
      platform: { type: String }, // e.g., "Android", "iOS", "Windows"
      ip: { type: String },
      loggedInAt: { type: Date, default: Date.now },
    },
  ],
});

const LoggedInDeviceModel = mongoose.model(
  "LoggedInDevice",
  loggedInDeviceSchema
);
export default LoggedInDeviceModel;
