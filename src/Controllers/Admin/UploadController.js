import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { getVideoDuration } from "../../Utils/getMetaData.js";
   

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
// export const mergeChunks = async (req, res) => {
//   try {
//     const { uploadId, originalName, title } = req.body;

//     const chunkDir = path.join("uploads", "chunks", uploadId);
//     const videosDir = path.join("uploads", "videos");

//     // ✅ Ensure output folder exists
//     if (!fs.existsSync(videosDir)) {
//       fs.mkdirSync(videosDir, { recursive: true });
//     }

//     const outputPath = path.join(videosDir, `${originalName}`);
//       const relativePath = `/uploads/videos/${originalName}`;
      
//     // ✅ Check chunk directory
//     if (!fs.existsSync(chunkDir)) {
//       return res.status(400).json({ message: "Chunk directory not found" });
//     }
     


//     const chunkFiles = fs
//       .readdirSync(chunkDir)
//       .filter((file) => file.startsWith("chunk_"))
//       .sort((a, b) => {
//         const aIndex = parseInt(a.split("_")[1]);
//         const bIndex = parseInt(b.split("_")[1]);
//         return aIndex - bIndex;
//       });

//     if (chunkFiles.length === 0) {
//       return res.status(400).json({ message: "No chunks found" });
//     }

//     // ✅ Merge chunks into a single file
//     const writeStream = fs.createWriteStream(outputPath);

//     for (const chunkFile of chunkFiles) {
//       const chunkPath = path.join(chunkDir, chunkFile);
//       const data = fs.readFileSync(chunkPath);
//       writeStream.write(data);
//     }

//     writeStream.end();

//     // ✅ Wait until writing is done
//     writeStream.on("finish", async () => {
//       try {
//         const stats = fs.statSync(outputPath);
//         const duration = await getVideoDuration(outputPath);

        
//         // ✅ Clean up chunk directory after a delay
//         setTimeout(() => {
//           try {
//             fs.rmSync(chunkDir, { recursive: true, force: true });
//             console.log(`✅ Chunk folder deleted: ${chunkDir}`);
//           } catch (cleanupErr) {
//             console.error("❌ Failed to delete chunk folder:", cleanupErr);
//           }
//         }, 500);

//         return res.status(201).json({
//           message: "Video uploaded & merged successfully",
//             data: {
//                 title: title,
//                 originalName: originalName,
//                 duration: duration,
//                 path: relativePath,
                
                
//           }
//         });
//       } catch (postProcessErr) {
//         console.error("❌ Post-merge error:", postProcessErr);
//         return res.status(500).json({
//           message: "Merge succeeded, but metadata or DB failed",
//           error: postProcessErr.message,
//         });
//       }
//     });

//     writeStream.on("error", (err) => {
//       console.error("❌ Write error:", err);
//       return res
//         .status(500)
//         .json({ message: "Merging failed", error: err.message });
//     });
//   } catch (err) {
//     console.error("❌ Merge error:", err);
//     return res
//       .status(500)
//       .json({ message: "Merge failed", error: err.message });
//   }
// };




// Helper: Background transcoding
function transcodeVideo(inputPath, outputPath, size) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-c:v libx264", // CPU encode (use h264_nvenc for GPU)
        "-preset veryfast",
        "-crf 23",
        "-c:a aac",
        "-b:a 128k"
      ])
      .size(size)
      .output(outputPath)
      .on("end", () => {
        console.log(`✅ Transcoded to ${size}: ${outputPath}`);
        resolve(outputPath);
      })
      .on("error", (err) => {
        console.error(`❌ FFmpeg error for ${size}:`, err);
        reject(err);
      })
      .run();
  });
}

export const mergeChunks = async (req, res) => {
  try {
    const { uploadId, originalName, title } = req.body;

    const chunkDir = path.join("uploads", "chunks", uploadId);
    const videosDir = path.join("uploads", "videos");

    if (!fs.existsSync(chunkDir)) {
      return res.status(400).json({ message: "Chunk directory not found" });
    }
    if (!fs.existsSync(videosDir)) {
      fs.mkdirSync(videosDir, { recursive: true });
    }

    const mergedFileName = `${path.parse(originalName).name}_original${path.extname(originalName)}`;
    const mergedFilePath = path.join(videosDir, mergedFileName);

    // Get all chunk files sorted
    const chunkFiles = fs
      .readdirSync(chunkDir)
      .filter(f => f.startsWith("chunk_"))
      .sort((a, b) => parseInt(a.split("_")[1]) - parseInt(b.split("_")[1]));

    if (chunkFiles.length === 0) {
      return res.status(400).json({ message: "No chunks found" });
    }

    // // Create FFmpeg concat list file
    // const listFile = path.join(chunkDir, "chunks.txt");
    // fs.writeFileSync(listFile, chunkFiles.map(f => `file '${path.join(chunkDir, f)}'`).join("\n"));

    // Create FFmpeg concat list file with proper paths
const listFile = path.join(chunkDir, "chunks.txt");
const concatList = chunkFiles
  .map(f => {
    const fullPath = path.resolve(path.join(chunkDir, f)).replace(/\\/g, "/");
    return `file '${fullPath}'`;
  })
  .join("\n");

fs.writeFileSync(listFile, concatList);


    // Merge chunks using FFmpeg (fast, no re-encode)
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(listFile)
        .inputOptions(["-f concat", "-safe 0"])
        .outputOptions(["-c copy"])
        .save(mergedFilePath)
        .on("end", resolve)
        .on("error", reject);
    });

    console.log(`✅ Merged video saved: ${mergedFilePath}`);

    // Get video duration
    const duration = await getVideoDuration(mergedFilePath);

    // Remove chunk folder after merging
    try {
      fs.rmSync(chunkDir, { recursive: true, force: true });
      console.log(`🗑️ Deleted chunk folder: ${chunkDir}`);
    } catch (cleanupErr) {
      console.error("⚠️ Failed to delete chunk folder:", cleanupErr);
    }

    // Respond immediately to user
    res.status(201).json({
      message: "Video merged successfully. Transcoding in background.",
      data: {
        title,
        originalName,
        duration,
        files: [{ resolution: "original", path: `/uploads/videos/${mergedFileName}` }]
      }
    });

    // Background transcoding
    (async () => {
      try {
        const resolutions = [
          { label: "480p", size: "854x480" },
          { label: "720p", size: "1280x720" },
          { label: "1080p", size: "1920x1080" }
        ];

        await Promise.all(resolutions.map(({ label, size }) => {
          const outFile = path.join(videosDir, `${path.parse(originalName).name}_${label}.mp4`);
          return transcodeVideo(mergedFilePath, outFile, size);
        }));

        console.log("✅ All resolutions transcoded successfully");
      } catch (err) {
        console.error("❌ Background transcoding failed:", err);
      }
    })();

  } catch (err) {
    console.error("❌ Merge/Transcode error:", err);
    res.status(500).json({ message: "Processing failed", error: err.message });
  }
};
