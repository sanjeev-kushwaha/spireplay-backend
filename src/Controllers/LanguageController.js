import * as LanguageService from "../Services/LanguageService.js"


/**
 * GET /languages
 */
export const getAllLanguages = async (req, res) =>{
    try {
        const languages = await LanguageService.getAll();
        res.status(200).json({success: true, data:languages})
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
}

/**
 * GET /language/:id
 */
export const getLanguageById = async (req, res) =>{
    try {
        const language = await LanguageService.single(req.params.id);
        res.status(200).json({success: true, data:language});
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
}

/**
 * POST /languages
 */
export const createLanguage = async (req, res) =>{
    try {
        const newLanguage = await LanguageService.create(req.body);
        res.status(200).json({success: true, data: newLanguage})
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
}

/**
 * PUT /language/:id
 */
export const updateLanguage = async (req, res) =>{
    try {
        const updatedLanguage = await LanguageService.update(req.params.id, req.body);
        res.status(200).json({success: true, data:updatedLanguage});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

/**
 * DELETE /language/:id
 */
export const deleteLanguage = async (req, res) =>{
    try {
        const deletedLanguage = await LanguageService.remove(req.params.id);
        res.status(200).json({success: true, data: deletedLanguage});
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
}


