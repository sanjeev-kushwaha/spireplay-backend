import express from "express";
import {
  creatVideoType,
  deleteVideoType,
  getAllVideoType,
  getVideoTypeById,
  updateVideoType,
} from "../Controllers/VideoTypeController.js";

const router = express.Router();

//Get all VideoType
router.get("/videoType", getAllVideoType);

//Get VideoType by Id
router.get("/videoType/:id", getVideoTypeById);

//Create VideoType
router.post("/videoType", creatVideoType);

//Update VideoType
router.put("/videoType/:id", updateVideoType);

//Soft Delete VideType
router.delete("/videoType/:id", deleteVideoType);
export default router;
