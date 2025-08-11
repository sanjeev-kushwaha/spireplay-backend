// /middlewares/uploadChunk.js
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { uploadId } = req.body;
    const chunkDir = path.join("uploads", "chunks", uploadId);
    fs.mkdirSync(chunkDir, { recursive: true });
    cb(null, chunkDir);
  },
  filename: (req, file, cb) => {
    const { chunkIndex } = req.body;
    cb(null, `${chunkIndex}`);
  },
});

const uploadChunk = multer({ storage });

export default uploadChunk;
