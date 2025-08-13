import * as VideoService from "../Services/VideoService.js"

/**
 * GET /Videos
 */
export const getAllVideo = async (req, res) =>{
    try {
        const videos = await VideoService.getAll();
        res.status(200).json({success: true, data:videos});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

/**
 * GET /Video/:id
 */
export const getVideoById = async (req, res) =>{
    try {
        const video = await VideoService.single(req.params.id);
        res.status(200).json({success: true, data: video});
    } catch (error) {
        res.status(500).json({success : false, message: error.message});
    }
}

/**
 * POST /Video
 */
export const createVideo = async (req, res) => {
    try {
        const newVideo  = await VideoService.create(req.body);
        res.status(200).json({success :true, data: newVideo});
    } catch (error) {
        res.status(500).json({success: false, message:error.message});
    }
}

/**
 * PUT /Video/:id
 */
export const updateVideo = async (req, res) => {
    try {
        const updatedVideo = await VideoService.update(req.params.id, req.body);
        res.status(200).json({success : true, data: updatedVideo});
    } catch (error) {
        res.status(500).json({success : false, message:error.message});
    }
}

/**
 * DELETE /Video/:id
 */
export const deleteVideo = async (req, res) =>{
    try {
        const deleteVideo = await VideoService.remove(req.params.id);
        res.status(200).json({success : true, data: deleteVideo});
    } catch (error) {
        res.status(500).json({success: false, message:error.message});
    }
}