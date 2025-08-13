import Model from "../Models/VideoModel.js";

export const getAll = async () => {
  try {
    const videos = await Model.find({ deleted: false });
    return videos;
  } catch (error) {
    throw new Error("Error fetching Videos: " + error.message);
  }
};

export const single = async (id) => {
  try {
    const video = await Model.findById({ id, deleted: false });
    if (!video || video.deleted) {
      throw new Error("Video not found");
    }
    return video;
  } catch (error) {
    throw new Error("Error fetching Video: " + error.message);
  }
};

export const create = async (videoData) => {
  try {
    const newVideo = new Model(videoData);
    await newVideo.save();
    return newVideo;
  } catch (error) {
    throw new Error("Error creating Video: " + error.message);
  }
};

export const update = async (id, videoData) => {
  try {
    const updatedVideo = await Model.findByIdAndUpdate(id, videoData, {
      new: true,
      runValidators: true,
    });
    if (!updatedVideo || updatedVideo.deleted) {
      throw new Error("Video not found");
    }
    return updatedVideo;
  } catch (error) {
    throw new Error("Error updating Video: " + error.message);
  }
};

export const remove = async (id) => {
  try {
    const deletedVideo = await Model.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!deletedVideo || !deletedVideo.deleted) {
      throw new Error("Video not found");
    }
    return deletedVideo;
  } catch (error) {
    throw new Error("Error deleting Video: " + error.message);
  }
};
