// utils/getMetaData.js
import ffmpeg from "fluent-ffmpeg";
import ffprobe from "ffprobe-static";

ffmpeg.setFfprobePath(ffprobe.path); // ✅ Use local binary

export const getVideoDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      resolve(metadata.format.duration);
    });
  });
};
