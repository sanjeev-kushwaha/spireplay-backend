import Model from "../Models/HistoryModel.js";

export const getAll = async () => {
  try {
    const data = await Model.find({ deleted: false });
    return data;
  } catch (error) {
    throw new Error("Error fetching history: " + error.message);
  }
};

export const single = async (id) => {
  try {
    const data = await Model.findOne({ _id: id, deleted: false });
    if (!data) {
      throw new Error("History not found");
    }
    return data;
  } catch (error) {
    throw new Error("Error fetching history: " + error.message);
  }
};

export const create = async (historyData) => {
  try {
    const newHistory = new Model(historyData);
    await newHistory.save();
    return newHistory;
  } catch (error) {
    throw new Error("Error creating history: " + error.message);
  }
};

export const update = async (id, historyData) => {
  try {
    const updatedHistory = await Model.findByIdAndUpdate(id, historyData, {
      new: true,
      runValidators: true,
    });
    if (!updatedHistory) {
      throw new Error("History not found");
    }
    return updatedHistory;
  } catch (error) {
    throw new Error("Error updating history: " + error.message);
  }
};

export const deleteHistory = async (id) => {
  try {
    const deletedHistory = await Model.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!deletedHistory) {
      throw new Error("History not found");
    }
    return deletedHistory;
  } catch (error) {
    throw new Error("Error deleting history: " + error.message);
  }
};

export const getByUser = async (userId) => {
  try {
    const data = await Model.find({ userId, deleted: false });
    return data;
  } catch (error) {
    throw new Error("Error fetching history by user: " + error.message);
  }
};

