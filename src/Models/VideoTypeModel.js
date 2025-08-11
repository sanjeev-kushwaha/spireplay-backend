import mongoose from "mongoose";

const videoTypeSchma = new mongoose.Schema({
  videoType: {
    type: String,
    required: true,
    enum: ["movie", "series", "documentary", "shortFilm"],
    
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const VideoTypeModel = mongoose.model("VideoType", videoTypeSchma);

export default VideoTypeModel;
