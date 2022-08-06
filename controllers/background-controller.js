import completeImage from '../models/completeImage.js'
import backgroundImage from '../models/backgroundImage.js'
import express from 'express'

// add user's custom bg to the aws
// export const postBgImage = (req, res) => {
//     console.log(req.body)
// }

export const getBgImage = async (req, res) => {
    let allBackgroundImages

    try {
        allBackgroundImages = await backgroundImage.find()
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }

    return res.status(200).json({success: true, allBackgroundImages})
}

// also create a single get bg image
