import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true },
  password: { type: String },
  userPlans: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserPlan",
    default: null,
  },
  trial: { type: String },
  isVerified: { type: Boolean, default: false },
  activeDevices: [String],
  deleted: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
