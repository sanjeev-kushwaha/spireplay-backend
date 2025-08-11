import express from "express";

import {
  createLanguage,
  deleteLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
} from "../Controllers/LanguageController.js";

const router = express.Router();

//Get all Language
router.get("/", getAllLanguages);

//Get Language by Id
router.get("/:id", getLanguageById);

//Create Language
router.post("/", createLanguage);

//Update Language
router.put("/:id", updateLanguage);

//Soft Delete Language
router.delete("/:id", deleteLanguage);

export default router;
