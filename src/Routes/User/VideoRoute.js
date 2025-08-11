import express from "express";
import path from "path";
import uploadChunk from "../../Middleware/uploadVideo.js";
import { mergeChunks } from "../../Utils/mergeChunks.js";

const router = express.Router();

router.post("/upload-chunk", uploadChunk.single("file"), (req, res) => {
  res.status(200).json({ message: "Chunk uploaded" });
});

router.post("/merge-chunks", async (req, res) => {
  const { uploadId, fileName } = req.body;

  try {
    const { url, duration } = await mergeChunks(uploadId, fileName);
    res.status(200).json({ message: "File merged", url, duration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Merge failed", error: err.message });
  }
});

export default router;
