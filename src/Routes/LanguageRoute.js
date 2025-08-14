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
router.get("/language", getAllLanguages);

//Get Language by Id
router.get("/language/:id", getLanguageById);

//Create Language
router.post("/language", createLanguage);

//Update Language
router.put("/language/:id", updateLanguage);

//Soft Delete Language
router.delete("/language/:id", deleteLanguage);

export default router;
