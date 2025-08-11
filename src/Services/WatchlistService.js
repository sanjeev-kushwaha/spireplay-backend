import Model from "../Models/watchlistModel.js";

export const getAll = async () => {
  try {
    const watchlistItems = await Model.find({ userId: userId });
    return watchlistItems;
  } catch (error) {
    throw new Error("Error fetching Watchlist Items: " + error.message);
  }
};

export const single = async (id) => {
  try {
    const watchlistItem = await Model.findById(id);
    if (!watchlistItem) {
      throw new Error("Watchlist Item not found");
    }
    return watchlistItem;
  } catch (error) {
    throw new Error("Error fetching Watchlist Item: " + error.message);
  }
};

export const create = async (watchlistData) => {
  try {
    const newWatchlistItem = new Model(watchlistData);
    await newWatchlistItem.save();
    return newWatchlistItem;
  } catch (error) {
    throw new Error("Error creating Watchlist Item: " + error.message);
  }
};

export const update = async (id, watchlistData) => {
  try {
    const updatedWatchlistItem = await Model.findByIdAndUpdate(
      id,
      watchlistData,
      { new: true }
    );
    if (!updatedWatchlistItem) {
      throw new Error("Watchlist Item not found");
    }
    return updatedWatchlistItem;
  } catch (error) {
    throw new Error("Error updating Watchlist Item: " + error.message);
  }
};

export const remove = async (id) => {
  try {
    const deletedWatchlistItem = await Model.findByIdAndDelete(id);
    if (!deletedWatchlistItem) {
      throw new Error("Watchlist Item not found");
    }
    return deletedWatchlistItem;
  } catch (error) {
    throw new Error("Error deleting Watchlist Item: " + error.message);
  }
};


