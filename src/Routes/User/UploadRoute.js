import express from "express";
import multer from "multer";
import fs from "fs";
import {
  uploadChunk,
  mergeChunks,
} from "../../Controllers/Admin/UploadController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "temp_chunks";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload-chunk", upload.single("chunk"), uploadChunk);
router.post("/merge-chunks", mergeChunks);

export default router;
