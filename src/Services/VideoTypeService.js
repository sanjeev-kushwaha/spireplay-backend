import Model from "../Models/VideoTypeModel.js";

export const getAll = async () => {
  try {
    const videoTypes = await Model.find({ deleted: false });
    return videoTypes;
  } catch (error) {
    throw new Error("Error fetching Video Types: " + error.message);
  }
};

export const single = async (id) => {
  try {
    const videoType = await Model.findById(id);
    if (!videoType || videoType.deleted) {
      throw new Error("Video Type not found");
    }
    return videoType;
  } catch (error) {
    throw new Error("Error fetching Video Type: " + error.message);
  }
};

export const create = async (videoTypeData) => {
  try {
    const newVideoType = new Model(videoTypeData);
    await newVideoType.save();
    return newVideoType;
  } catch (error) {
    throw new Error("Error creating Video Type: " + error.message);
  }
};

export const update = async (id, videoTypeData) => {
  try {
    const updatedVideoType = await Model.findByIdAndUpdate(id, videoTypeData, {
      new: true,
      runValidators: true,
    });
    if (!updatedVideoType || updatedVideoType.deleted) {
      throw new Error("Video Type not found");
    }
    return updatedVideoType;
  } catch (error) {
    throw new Error("Error updating Video Type: " + error.message);
  }
};

export const remove = async (id) => {
    try {
        const deletedVideoType = await Model.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!deletedVideoType) {
            throw new Error("Video Type not found");
        }
        return deletedVideoType;
    } catch (error) {
        throw new Error("Error deleting Video Type: " + error.message);
    }
};
