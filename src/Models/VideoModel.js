import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "VideoType",
  },
  langauge: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Language",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  cast: { type: [String], required: true },
  certification: { type: String, required: true },
  rating: { type: Number, default: 0 },

  deleted: { type: Boolean, default: false },
});

export const VideoModel = mongoose.model("Video", videoSchema);
export default VideoModel;
