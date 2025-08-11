import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

const __dirname = path.resolve();

export const mergeChunks = (uploadId, fileName) => {
  return new Promise((resolve, reject) => {
    const chunkDir = path.join(__dirname, "uploads", "chunks", uploadId);
    const outputDir = path.join(__dirname, "uploads", "videos");
    const finalPath = path.join(outputDir, fileName);

    const chunkFiles = fs
      .readdirSync(chunkDir)
      .filter((f) => f.startsWith("chunk_"))
      .sort((a, b) => {
        const aNum = parseInt(a.split("_")[1]);
        const bNum = parseInt(b.split("_")[1]);
        return aNum - bNum;
      });

    const writeStream = fs.createWriteStream(finalPath);
    for (const chunk of chunkFiles) {
      const chunkPath = path.join(chunkDir, chunk);
      const data = fs.readFileSync(chunkPath);
      writeStream.write(data);
    }

    writeStream.end();
    writeStream.on("finish", () => {
      // Clean up
      fs.rmSync(chunkDir, { recursive: true, force: true });

      // Get duration using ffmpeg
      ffmpeg.ffprobe(finalPath, (err, metadata) => {
        if (err) return reject(err);
        const duration = metadata.format.duration;
        resolve({ url: `/videos/${fileName}`, duration });
      });
    });

    writeStream.on("error", reject);
  });
};
