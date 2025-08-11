import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    videoId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
    profileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Profile" },
    watchedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    durationWatched: { type: String, required: true },
});

export const HistoryModel = mongoose.model("History", historySchema);
export default HistoryModel;