import User from "../../Models/UserModel.js";
import { getCurrentUser } from "../../Utils/getCurrentUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const registerData = req.body;
  

  try {
    const { name, phone } = registerData;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, phone });
    await newUser.save();

    return res.status(201).json({ message: "OTP sent on your phone" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (otp === "1234") {
      user.isVerified = true;
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "User verified successfully",
        type: "Bearer",
        token: token,
      });
    }
    return res.status(400).json({ message: "Invalid OTP" });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const setPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await getCurrentUser(req);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password set successfully" });
  } catch (error) {
    console.error("Error setting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password, deviceId } = req.body;

    if (!phone || !password || !deviceId) {
      return res.status(400).json({
        message: "Phone, password, and device ID are required",
      });
    }

    const user = await User.findOne({ phone })
      .populate("userPlans");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "User not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Ensure activeDevices exists
    if (!Array.isArray(user.activeDevices)) {
      user.activeDevices = [];
    }

    const alreadyLoggedIn = user.activeDevices.includes(deviceId);

    // Check device limit only if a plan exists
    if (user.subscriptionPlan) {
      if (
        !alreadyLoggedIn &&
        user.activeDevices.length >= user.subscriptionPlan.deviceCount
      ) {
        return res.status(403).json({ message: "Device limit reached" });
      }
    }

    // Add device if not already present
    if (!alreadyLoggedIn) {
      user.activeDevices.push(deviceId);
      await user.save();
    }

    // Check if the plan exists and is still valid
    if (user.userPlans && user.userPlans.endDate) {
      const now = new Date();
      const planEnd = new Date(user.userPlans.endDate);
        console.log(planEnd);
      if (now > planEnd) {
        return res.status(403).json({
          message: "Login successful, but your plan has expired.",
          token,
          userData: user,
          userPlans: "You do not have an active plan.",
        });
      }
    } else {
      return res.status(403).json({
        message: "Login successful, but no active plan found.",
        token,
        userData: user,
        userPlans: "You do not have an active plan.",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      token,
      userData: user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const { deviceId } = req.body;
    if (!user || !deviceId) {
      return res.status(400).json({ message: "Invalid logout request" });
    }

    user.activeDevices = user.activeDevices.filter((id) => id !== deviceId);
    await user.save();

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
