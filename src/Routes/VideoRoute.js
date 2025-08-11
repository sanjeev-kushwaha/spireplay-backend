import express from "express";
import {
  createVideo,
  deleteVideo,
  getAllVideo,
  getVideoById,
  updateVideo,
} from "../Controllers/VideoController.js";

const router = express.Router();

//Get All Videos
router.get("/", getAllVideo);

//Get Video by id
router.get("/:id", getVideoById);

//Create video
router.post("/", createVideo);

//Update Video
router.put("/:id", updateVideo);

//Delete Video
router.delete("/:id", deleteVideo);

export default router;
