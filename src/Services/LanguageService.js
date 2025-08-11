import {LanguageModel as Model} from "../Models/LanguageModel.js";

export const getAll = async () => {
  try {
    const languages = await Model.find({ deleted: false });
    return languages;
  } catch (error) {
    throw new Error("Error fetching Languages: " + error.message);
  }
};

export const single = async (id) => {
  try {
    const language = await Model.findById({_id: id, deleted: false });
    if (!language || language.deleted) {
      throw new Error("Language not found");
    }
    return language;
  } catch (error) {
    throw new Error("Error fetching Language: " + error.message);
  }
};

export const create = async (languageData) => {
  try {
    const newLanguage = new Model(languageData);
    await newLanguage.save();
    return newLanguage;
  } catch (error) {
    throw new Error("Error creating Language: " + error.message);
  }
};

export const update = async (id, languageData) => {
  try {
     
    const updatedLanguage = await Model.findByIdAndUpdate(id, languageData, {
      new: true,
      runValidators: true,
    });
    if (!updatedLanguage || updatedLanguage.deleted) {
      throw new Error("Language not found");
    }
    return updatedLanguage;
  } catch (error) {
    throw new Error("Error updating Language: " + error.message);
  }
};

export const remove = async (id) => {
  try {
    const deletedLanguage = await Model.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!deletedLanguage) {
      throw new Error("Language not found");
    }
    return deletedLanguage;
  } catch (error) {
    throw new Error("Error deleting Language: " + error.message);
  }
};
