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
router.get("/video", getAllVideo);

//Get Video by id
router.get("/video/:id", getVideoById);

//Create video
router.post("/video", createVideo);

//Update Video
router.put("/video/:id", updateVideo);

//Delete Video
router.delete("/video/:id", deleteVideo);

export default router;
