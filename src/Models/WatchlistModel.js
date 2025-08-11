import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Video",
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  deleted: { type: Boolean, default: false },
});

export const WatchlistModel = mongoose.model("Watchlist", watchlistSchema);
export default WatchlistModel;
