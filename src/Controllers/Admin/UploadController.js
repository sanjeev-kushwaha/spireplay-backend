import fs from "fs";
import path from "path";
import { getVideoDuration } from "../../Utils/getMetaData.js";
import VideoModel from "../../Models/VideoModel.js";

export const uploadChunk = async (req, res) => {
  try {
    const { uploadId, chunkIndex } = req.body;
    const chunk = req.file;

    if (!uploadId || chunkIndex == null || !chunk)
      return res.status(400).json({ message: "Missing data" });

    const chunkDir = path.join("uploads", "chunks", uploadId);
    await fs.promises.mkdir(chunkDir, { recursive: true });

    const chunkPath = path.join(chunkDir, `chunk_${chunkIndex}`);
    await fs.promises.rename(chunk.path, chunkPath);

    return res.status(200).json({ message: `Chunk ${chunkIndex} uploaded` });
  } catch (error) {
    console.error("Upload chunk error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Merge Chunks
export const mergeChunks = async (req, res) => {
  try {
    const { uploadId, originalName, title } = req.body;

    const chunkDir = path.join("uploads", "chunks", uploadId);
    const videosDir = path.join("uploads", "videos");

    // ✅ Ensure output folder exists
    if (!fs.existsSync(videosDir)) {
      fs.mkdirSync(videosDir, { recursive: true });
    }

    const outputPath = path.join(videosDir, `${originalName}`);
      const relativePath = `uploads/videos/${originalName}`;
      
    // ✅ Check chunk directory
    if (!fs.existsSync(chunkDir)) {
      return res.status(400).json({ message: "Chunk directory not found" });
    }
     


    const chunkFiles = fs
      .readdirSync(chunkDir)
      .filter((file) => file.startsWith("chunk_"))
      .sort((a, b) => {
        const aIndex = parseInt(a.split("_")[1]);
        const bIndex = parseInt(b.split("_")[1]);
        return aIndex - bIndex;
      });

    if (chunkFiles.length === 0) {
      return res.status(400).json({ message: "No chunks found" });
    }

    // ✅ Merge chunks into a single file
    const writeStream = fs.createWriteStream(outputPath);

    for (const chunkFile of chunkFiles) {
      const chunkPath = path.join(chunkDir, chunkFile);
      const data = fs.readFileSync(chunkPath);
      writeStream.write(data);
    }

    writeStream.end();

    // ✅ Wait until writing is done
    writeStream.on("finish", async () => {
      try {
        const stats = fs.statSync(outputPath);
        const duration = await getVideoDuration(outputPath);

        
        // ✅ Clean up chunk directory after a delay
        setTimeout(() => {
          try {
            fs.rmSync(chunkDir, { recursive: true, force: true });
            console.log(`✅ Chunk folder deleted: ${chunkDir}`);
          } catch (cleanupErr) {
            console.error("❌ Failed to delete chunk folder:", cleanupErr);
          }
        }, 500);

        return res.status(201).json({
          message: "Video uploaded & merged successfully",
            data: {
                title: title,
                originalName: originalName,
                duration: duration,
                path: relativePath,
                
                
          }
        });
      } catch (postProcessErr) {
        console.error("❌ Post-merge error:", postProcessErr);
        return res.status(500).json({
          message: "Merge succeeded, but metadata or DB failed",
          error: postProcessErr.message,
        });
      }
    });

    writeStream.on("error", (err) => {
      console.error("❌ Write error:", err);
      return res
        .status(500)
        .json({ message: "Merging failed", error: err.message });
    });
  } catch (err) {
    console.error("❌ Merge error:", err);
    return res
      .status(500)
      .json({ message: "Merge failed", error: err.message });
  }
};
