import mongoose from "mongoose";

const videoTypeSchma = new mongoose.Schema({
  videoType: {
    type: String,
    required: true,
    enum: ["movie", "series", "documentary", "shortFilm"],
  },
});

const VideoTypeModel = mongoose.model("VideoType", videoTypeSchma);

export default VideoTypeModel;
