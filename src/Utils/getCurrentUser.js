import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const getCurrentUser = async (req) => {
  try {
    const authheader = req.headers.authorization;
    if (!authheader || !authheader.startsWith("Bearer ")) {
      throw new Error("No token provided");
    }
    const token = authheader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw new Error("Unauthorized: " + error.message);
  }
};
