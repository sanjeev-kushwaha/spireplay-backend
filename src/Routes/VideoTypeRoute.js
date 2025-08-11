import express from "express"
import { creatVideoType, deleteVideoType, getAllVideoType, getVideoTypeById, updateVideoType } from "../Controllers/VideoTypeController.js";

const router = express.Router();

//Get all VideoType
router.get("/", getAllVideoType)

//Get VideoType by Id
router.get("/:id", getVideoTypeById)

//Create VideoType
router.post("/", creatVideoType)

//Update VideoType
router.put("/:id", updateVideoType)

//Soft Delete VideType
router.delete("/:id", deleteVideoType)
export default router;