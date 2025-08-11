import * as VideoTypeService from "../Services/VideoTypeService.js";


/**
 * GET /VideoType
 */
export const getAllVideoType =  async (req, res) =>{
    try {
        const videoTypes = await VideoTypeService.getAll();
        res.status(200).json({success: true, data: videoTypes})
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
}

/**
 * GET /VideoType/:id
 */
export const getVideoTypeById = async (req, res) =>{
    try {
        const videoType = await VideoTypeService.single(req.params.id);
        res.status(200).json({success: true, data:videoType})
    } catch (error) {
        res.status(500).json({success: false, message:error.message});
    }
}

/**
 * POST /VidepType
 */
export const creatVideoType = async (req, res) =>{
    try {
        const newVideoType = await VideoTypeService.create(req.body);
        res.status(200).json({success: true, data:newVideoType})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

/**
 * PUT /VideoType/:id
 */
export const updateVideoType = async (req, res) =>{
    try {
        const updatedVideoType = await VideoTypeService.update(req.params.id, req.body);
        res.status(200).json({success:true, data:updatedVideoType});
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
}

/**
 * DELETE /VideoType/:id
 */
export const deleteVideoType = async (req, res) =>{
    try {
        const deletedVideoType = await VideoTypeService.remove(req.params.id);
        res.status(200).json({success: true, data:deletedVideoType});
    } catch (error) {
        res.status(500).json({success : false, message:error.message});
    }
}