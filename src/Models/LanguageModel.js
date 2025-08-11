import mongoose from "mongoose";

const videoTypeSchema = new mongoose.Schema({
  language: { type: String, required: true },
    deleted: { type: Boolean, default: false },
});

 export const LanguageModel = mongoose.model("Language", videoTypeSchema);

 
                  